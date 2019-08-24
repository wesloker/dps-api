const runExpressServer = require('./api/server');
const connectDatabase = require('./api/database');
const { APP, DATABASE, NODE_ENV } = require('./api/config/enviroment');

const init = new Promise(async (resolve, reject) => {
  try {
    const client = await connectDatabase(DATABASE, NODE_ENV);
    await client
      .authenticate()
      .then(() => {
        process.stdout.write('Connection has been established successfully\n');
        module.exports = client;
        resolve(client);
      })
      .catch((err) => {
        process.stdout.write('Unable to connect to the database: \n');
        reject(err);
      });
  } catch (err) {
    throw new Error(err);
  }
});

init
  .then((client) => {
    runExpressServer(APP, NODE_ENV, client);
  })
  .catch((err) => {
    throw new Error(err);
  });
