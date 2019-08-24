const placesSchemas = require('./places/');
const earthquakeReportsSchemas = require('./earthquakeReports/');

module.exports = (client) => {
  placesSchemas(client);
  earthquakeReportsSchemas(client);
};
