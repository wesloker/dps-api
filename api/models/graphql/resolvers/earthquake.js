const { fetchIGPAPI, scrapIGPWebPage } = require('../../../helpers/earthquake.helpers');

module.exports = {
  async getEarthquakeReport(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const attributes = ['id', 'num', 'date', 'time', 'lat', 'lng', 'mag', 'depth', 'intensity'];
      const where = {
        [input.dataType]: input.dataValue.toUpperCase(),
      };
      const report = await client.models.earthquakereports.findOne({
        where,
        attributes,
      });
      if (report === null) {
        throw new Error('Report not exist.');
      }
      return {
        _id: report.dataValues.id,
        num: report.dataValues.num,
        date: report.dataValues.date,
        localtime: report.dataValues.time,
        lat: report.dataValues.lat,
        lng: report.dataValues.lng,
        mag: report.dataValues.mag,
        depth: report.dataValues.depth,
        intensity: report.dataValues.intensity,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async getEarthquakeReports(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const attributes = ['id', 'num', 'date', 'time', 'lat', 'lng', 'mag', 'depth', 'intensity'];
      const where =
        input.dataType !== '' && input.dataValue !== ''
          ? {
              [input.dataType]: input.dataValue.toUpperCase(),
            }
          : {};
      const data = await client.models.earthquakereports.findAll({
        where,
        attributes,
      });
      if (data.length < 1) {
        throw new Error('Data is null');
      }
      const reports = data.map((obj) => {
        return {
          _id: obj.dataValues.id,
          num: obj.dataValues.num,
          date: obj.dataValues.date,
          localtime: obj.dataValues.time,
          lat: obj.dataValues.lat,
          lng: obj.dataValues.lng,
          depth: obj.dataValues.depth,
          mag: obj.dataValues.mag,
          intensity: obj.dataValues.intensity,
        };
      });
      return reports;
    } catch (err) {
      throw new Error(err);
    }
  },
  async setEarthquakeReport(_parent, args, { client }) {
    try {
      const { input } = args;
      const fields = ['num', 'date', 'localtime', 'lat', 'lng', 'mag', 'depth', 'intensity'];
      const report = await client.models.earthquakereports.create(
        {
          num: input.num,
          date: input.date,
          localtime: input.localtime,
          lat: input.lat.toString(),
          lng: input.lng.toString(),
          depth: input.depth,
          mag: input.mag,
          intensity: input.intensity,
        },
        { fields },
      );
      await report.save().then((row) => {
        if (row === null) {
          throw new Error('Report not saved');
        }
      });
      return {
        ...report.dataValues,
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async setAllEarthquakeReports(_parent, args, { client }) {
    try {
      const { input } = args;
      const fields = ['num', 'date', 'localtime', 'lat', 'lng', 'mag', 'depth', 'intensity'];
      let data;
      if (typeof input.method === 'undefined' || input.method === null) {
        throw new Error('Unexpected value. METHOD must be a string but got: ', input.method);
      } else if (input.method === 'default' || input.method === 'fetch') {
        data = await fetchIGPAPI(input.id);
      } else if (input.method === 'scrap') {
        data = await scrapIGPWebPage(input.id);
      }
      const dataset = Object.entries(data.reports).map((report) => {
        return Object.assign(
          {},
          {
            num: report[0],
            date: report[1].date,
            localtime: report[1].localtime,
            lat: report[1].lat.toString(),
            lng: report[1].lng.toString(),
            depth: report[1].depth,
            mag: report[1].mag,
            intensity: report[1].intensity,
          },
        );
      });
      const reports = await client.models.earthquakereports.bulkCreate([...dataset], {
        fields,
      });
      return reports;
    } catch (err) {
      throw new Error(err);
    }
  },
};
