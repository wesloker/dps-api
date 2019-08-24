const router = require('express').Router();
const ec = require('../controllers/earthquake.ctrl');

module.exports = router
  .post('/earthquake/report', ec.getReport)
  .post('/earthquake/reports', ec.getReports);
