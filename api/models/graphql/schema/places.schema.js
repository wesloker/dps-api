const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

// const { placesResolvers: resolvers } = require('../resolvers');
const { placesResolvers: resolvers } = require('../resolvers');

// GraphQLObjectTypes
const PopulationType = new GraphQLObjectType({
  name: 'Population',
  fields: () => ({
    total: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    male: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    female: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});

const HousesType = new GraphQLObjectType({
  name: 'Houses',
  fields: () => ({
    total: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    occupied: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    unoccupied: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});

const PopulationCenterType = new GraphQLObjectType({
  name: 'PopulationCenter',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    district_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    code: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    natReg: {
      type: new GraphQLNonNull(GraphQLString),
    },
    altitude: {
      type: new GraphQLNonNull(GraphQLString),
    },
    population: {
      type: new GraphQLNonNull(PopulationType),
    },
    houses: {
      type: new GraphQLNonNull(HousesType),
    },
  }),
});

const DistrictType = new GraphQLObjectType({
  name: 'District',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    province_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    code: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    population: {
      type: new GraphQLNonNull(PopulationType),
    },
    houses: {
      type: new GraphQLNonNull(HousesType),
    },
    popCenters: {
      type: new GraphQLList(PopulationCenterType),
      resolve(parent, args, context) {
        // return resolvers.getPopCenters(parent, args, context);
        return resolvers.getPopCenters(
          parent,
          Object.assign(args, {
            dataType: 'district_id',
            dataValue: parent._id,
          }),
          context,
        );
      },
    },
  }),
});

const ProvinceType = new GraphQLObjectType({
  name: 'Province',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    department_id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    code: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    population: {
      type: new GraphQLNonNull(PopulationType),
    },
    houses: {
      type: new GraphQLNonNull(HousesType),
    },
    districts: {
      type: new GraphQLList(DistrictType),
      resolve(parent, args, context) {
        // return resolvers.getDistricts(parent, args, context);
        return resolvers.getDistricts(
          parent,
          Object.assign(args, {
            dataType: 'province_id',
            dataValue: parent._id,
          }),
          context,
        );
      },
    },
  }),
});

const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    code: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    population: {
      type: new GraphQLNonNull(PopulationType),
    },
    houses: {
      type: new GraphQLNonNull(HousesType),
    },
    provinces: {
      type: new GraphQLList(ProvinceType),
      resolve(parent, args, context) {
        return resolvers.getProvinces(
          parent,
          Object.assign(args, {
            dataType: 'department_id',
            dataValue: parent._id,
          }),
          context,
        );
      },
    },
  }),
});
// GraphQLInputObjectType
const PlacesConditionInputType = new GraphQLInputObjectType({
  name: 'PlacesConditionInputType',
  fields: () => ({
    dataType: {
      type: new GraphQLNonNull(GraphQLString),
    },
    dataValue: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

module.exports = {
  queries: {
    popCenter: {
      type: PopulationCenterType,
      args: {
        input: {
          type: new GraphQLNonNull(PlacesConditionInputType),
        },
      },
      resolve(parent, args, context) {
        return resolvers.getPopCenter(parent, args, context);
      },
    },
    district: {
      type: DistrictType,
      args: {
        input: {
          type: new GraphQLNonNull(PlacesConditionInputType),
        },
      },
      resolve(parent, args, context) {
        return resolvers.getDistrict(parent, args, context);
      },
    },
    province: {
      type: ProvinceType,
      args: {
        input: {
          type: new GraphQLNonNull(PlacesConditionInputType),
        },
      },
      resolve(parent, args, context) {
        return resolvers.getProvince(parent, args, context);
      },
    },
    department: {
      type: DepartmentType,
      args: {
        input: {
          type: new GraphQLNonNull(PlacesConditionInputType),
        },
      },
      resolve(parent, args, context) {
        return resolvers.getDepartment(parent, args, context);
      },
    },
    popCenters: {
      type: new GraphQLList(PopulationCenterType),
      args: {
        input: {
          type: PlacesConditionInputType,
          defaultValue: {
            dataType: '',
            dataValue: '',
          },
        },
      },
      resolve(parent, args, context) {
        return resolvers.getPopCenters(parent, args, context);
      },
    },
    districts: {
      type: new GraphQLList(DistrictType),
      args: {
        input: {
          type: PlacesConditionInputType,
          defaultValue: {
            dataType: '',
            dataValue: '',
          },
        },
      },
      resolve(parent, args, context) {
        return resolvers.getDistricts(parent, args, context);
      },
    },
    provinces: {
      type: new GraphQLList(ProvinceType),
      args: {
        input: {
          type: PlacesConditionInputType,
          defaultValue: {
            dataType: '',
            dataValue: '',
          },
        },
      },
      resolve(parent, args, context) {
        return resolvers.getProvinces(parent, args, context);
      },
    },
    departments: {
      type: new GraphQLList(DepartmentType),
      args: {
        input: {
          type: PlacesConditionInputType,
          defaultValue: {
            dataType: '',
            dataValue: '',
          },
        },
      },
      resolve(parent, args, context) {
        return resolvers.getDepartments(parent, args, context);
      },
    },
  },
};
