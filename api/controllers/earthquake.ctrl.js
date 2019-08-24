const executeQuery = require('../models/executeQuery');

module.exports = {
  getReport(req, res) {
    const { query, variables } = req.body;
    executeQuery(
      query,
      (data) => {
        return res.json(data);
      },
      variables,
    );
  },
  getReports(req, res) {
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
