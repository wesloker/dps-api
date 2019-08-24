const router = require('express').Router();

const pc = require('../controllers/places.ctrl');

module.exports = router
  .post('/department', pc.getDepartment)
  .post('/departments', pc.getDepartments)
  .post('/district', pc.getDistrict)
  .post('/districts', pc.getDistricts)
  .post('/province', pc.getProvince)
  .post('/provinces', pc.getProvinces)
  .post('/popcenter', pc.getPopCenter)
  .post('/popcenters', pc.getPopCenters);
