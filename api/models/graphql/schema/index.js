const { GraphQLObjectType } = require('graphql');
const placesSchema = require('./places.schema');
const earthquakeSchema = require('./earthquake.schema');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ...placesSchema.queries,
    ...earthquakeSchema.queries,
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...earthquakeSchema.mutations,
  }),
});

module.exports = {
  RootQuery,
  Mutation,
};
