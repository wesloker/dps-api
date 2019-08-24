const executeQuery = require('../models/executeQuery');

module.exports = {
  getDepartment(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
  getDepartments(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
  getProvince(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
  getProvinces(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
  getDistrict(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
  getDistricts(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
  getPopCenter(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
  getPopCenters(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
};
