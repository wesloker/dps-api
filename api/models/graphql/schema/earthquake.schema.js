const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

// const { earthquakeResolvers: resolvers } = require('../resolvers');
const { earthquakeResolvers: resolvers } = require('../resolvers');

// GraphQLObjectTypes
const EarthquakeReportType = new GraphQLObjectType({
  name: 'EarthquakeReport',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    num: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    localtime: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lat: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lng: {
      type: new GraphQLNonNull(GraphQLString),
    },
    depth: {
      type: GraphQLInt,
    },
    mag: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    intensity: {
      type: GraphQLString,
    },
  }),
});

// GraphQLInputObjectType
const EarthquakeConditionInputType = new GraphQLInputObjectType({
  name: 'EarthquakeConditionInputType',
  fields: () => ({
    dataType: {
      type: new GraphQLNonNull(GraphQLString),
    },
    dataValue: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

const EarthquakeReportInputType = new GraphQLInputObjectType({
  name: 'EarthquakeReportInputType',
  fields: () => ({
    num: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    localtime: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lat: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lng: {
      type: new GraphQLNonNull(GraphQLString),
    },
    depth: {
      type: GraphQLInt,
    },
    mag: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    intensity: {
      type: GraphQLString,
    },
  }),
});

const EarthquakeReportMutationInputType = new GraphQLInputObjectType({
  name: 'EarthquakeReportMutationInputType',
  fields: () => ({
    method: {
      type: new GraphQLNonNull(GraphQLString),
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

module.exports = {
  queries: {
    earthquakeReport: {
      type: EarthquakeReportType,
      args: {
        input: {
          type: new GraphQLNonNull(EarthquakeConditionInputType),
        },
      },
      resolve(parent, args, context) {
        return resolvers.getEarthquakeReport(parent, args, context);
      },
    },
    earthquakeReports: {
      type: new GraphQLList(EarthquakeReportType),
      args: {
        input: {
          type: EarthquakeConditionInputType,
          defaultValue: {
            dataType: '',
            dataValue: '',
          },
        },
      },
      resolve(parent, args, context) {
        return resolvers.getEarthquakeReports(parent, args, context);
      },
    },
  },
  mutations: {
    setEarthquakeReport: {
      type: EarthquakeReportType,
      args: {
        input: {
          type: new GraphQLNonNull(EarthquakeReportInputType),
        },
      },
      resolve(parent, args, context) {
        return resolvers.setEarthquakeReport(parent, args, context);
      },
    },
    setAllEarthquakeReports: {
      type: new GraphQLList(EarthquakeReportType),
      args: {
        input: {
          type: new GraphQLNonNull(EarthquakeReportMutationInputType),
        },
      },
      resolve(parent, args, context) {
        return resolvers.setAllEarthquakeReports(parent, args, context);
      },
    },
  },
};
