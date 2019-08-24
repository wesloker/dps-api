const departmentSchema = require('./department.schema');
const provinceSchema = require('./provinces.schema');
const districtSchema = require('./districts.schema');
const popCenterSchema = require('./popCenters.schema');

module.exports = (client) => {
  departmentSchema(client);
  provinceSchema(client);
  districtSchema(client);
  popCenterSchema(client);
};
