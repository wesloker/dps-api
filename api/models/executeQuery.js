const { graphql } = require('graphql');

const schema = require('./graphql/');

module.exports = (query, cb, variableValues) => {
  // eslint-disable-next-line global-require
  const client = require('../../');
  graphql(schema, query, null, { client }, variableValues)
    .then((res) => cb(res))
    .catch((err) => {
      throw new Error(err);
    });
};
