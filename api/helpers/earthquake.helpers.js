const http = require('http');
const fetch = require('node-fetch');
const { PDFExtract } = require('pdf.js-extract');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const IGPEndpoint = 'http://ultimosismo.igp.gob.pe/sismos?sort=createdAt%20desc';

module.exports = {
  /**
   * @param {number | string} id - Earthquake report identifier.
   */
  async scrapIGPWebPage(id) {
    try {
      if (typeof id === 'undefined' || id === null) {
        throw new Error(`Unexpected value. ID must be a string or number but got: ${id}`);
      } else if (typeof id === 'string' && id === 'all') {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://intranet.igp.gob.pe/bdsismos/report.php');
        const data = await page.evaluate(() => {});
        return data;
      } else if (parseInt(id) <= 0) {
        throw new Error(
          `Unexpected value. ID must be a string or number greater than 0 but got: ${id}`,
        );
      } else {
        throw new Error(`Unexpected value. ID value must be 'last' or 'all' but got: ${id}`);
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * @param {number | string} id - Earthquake report identifier.
   */
  async fetchIGPAPI(id) {
    try {
      if (
        typeof id === 'undefined' ||
        typeof id === 'function' ||
        typeof id === 'object' ||
        typeof id === 'boolean' ||
        id === null ||
        Array.isArray(id)
      ) {
        throw new Error(`Unexpected value. ID must be a string or number but got: ${id}`);
      } else if (typeof id === 'string' && id === 'last') {
        const data = await fetch(IGPEndpoint);
        const IGPReport = await data.json();
        const report = {};
        const arr = [
          ['NumeroReporte', 'num'],
          ['FechaLocal', 'date'],
          ['HoraLocal', 'localtime'],
          ['Magnitud', 'mag'],
          ['Referencia', 'ref'],
          ['Latitud', 'lat'],
          ['Longitud', 'lng'],
          ['Profundidad', 'depth'],
          ['Intensidad', 'intensity'],
        ];
        Object.entries(IGPReport[0]).map((obj) => {
          return arr.filter((el) => {
            if (obj[0] === el[0]) {
              return Object.assign(report, { [el[1]]: obj[1] });
            }
          });
        });
        return report;
      } else if (typeof id === 'string' && id === 'all') {
        const filename = `reports-${new Date().getFullYear()}.pdf`;
        const writeStream = await fs.createWriteStream(
          path.join(__dirname, '../reportFiles', filename),
        );
        const downloadFile = new Promise(async (resolve, reject) => {
          await http.get('http://intranet.igp.gob.pe/bdsismos/report.php', (res) => {
            res.pipe(writeStream);
            res.on('end', () => {
              resolve('File downloaded');
            });
            res.on('error', (err) => {
              reject(err);
            });
          });
        });
        await downloadFile
          .then((status) => {
            process.stdout.write(`${status}\n`);
          })
          .catch((err) => {
            throw new Error(err);
          });
        const extractPDFData = new Promise(async (resolve, reject) => {
          const pdfExtract = new PDFExtract();
          const options = {};
          const reports = {};
          let report = {};
          let reportsPerMonth;
          const arr1 = [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11]];
          const arr2 = [];
          await pdfExtract.extract(
            path.join(__dirname, '../reportFiles', filename),
            options,
            (err, pdf) => {
              if (err) reject(err);
              pdf.pages.forEach((page) => {
                page.content.forEach((el, index) => {
                  if (el.str.toUpperCase() === 'DICIEMBRE') {
                    arr1.map((month, indx) => {
                      if (indx <= new Date().getMonth()) {
                        return month.push(page.content[index + 1 + indx].str);
                      }
                    });
                  }
                  if (el.str.search('/2019') === 5) {
                    report = {
                      date: el.str.trim(),
                      localtime: page.content[index + 1].str.trim(),
                      lat: page.content[index + 2].str.trim(),
                      lng: page.content[index + 3].str.trim(),
                      depth: page.content[index + 4].str.trim(),
                      mag: page.content[index + 5].str.trim(),
                      intensity: page.content[index + 6].str.trim(),
                    };
                    if (report.intensity.trim().search('/2019') === 5) {
                      delete report.intensity;
                    }
                    arr2.push(report);
                  }
                });
              });
              reportsPerMonth = arr1
                .filter((el) => el.length > 1)
                .map((el) => {
                  return { [el[0]]: el[1] };
                })
                .reduce((prev, current) => {
                  return Object.assign(prev, current);
                });
              arr2.forEach((el, index) => {
                reports[arr2.length - index] = el;
              });
              resolve({ reportsPerMonth, reports });
            },
          );
        });
        const allReports = await extractPDFData
          .then((data) => {
            process.stdout.write('Mapped file\n');
            return data;
          })
          .catch((err) => {
            throw new Error(err);
          });
        process.stdout.write('Terminated process\n');
        return allReports;
      } else if (parseInt(id) <= 0) {
        throw new Error(`Unexpected value. ID must be a number greater than 0 but got: ${id}`);
      } else {
        throw new Error(`Unexpected value. ID value must be 'last' or 'all' but got: ${id}`);
      }
    } catch (err) {
      throw err;
    }
  },
};
