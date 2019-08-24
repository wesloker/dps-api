const reportSchema = require('./report.schema');

module.exports = (client) => {
  reportSchema(client);
};
