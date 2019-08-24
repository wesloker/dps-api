const { GraphQLSchema } = require('graphql');
const { RootQuery, Mutation } = require('./schema/');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
