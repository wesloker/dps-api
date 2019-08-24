module.exports = {
  async getPopCenter(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const where = {
        [input.dataType]: input.dataValue.toUpperCase(),
      };
      const popCenter = await client.models.popcenters.findOne({
        where,
      });
      if (popCenter === null) {
        throw new Error('Resource not found');
      }
      return {
        _id: popCenter.dataValues.id,
        district_id: popCenter.dataValues.district_id,
        code: popCenter.dataValues.code,
        name: popCenter.dataValues.name,
        natReg: popCenter.dataValues.natReg,
        altitude: popCenter.dataValues.altitude,
        population: {
          total: popCenter.dataValues.total_pop,
          male: popCenter.dataValues.male_pop,
          female: popCenter.dataValues.female_pop,
        },
        houses: {
          total: popCenter.dataValues.total_houses,
          occupied: popCenter.dataValues.occupied_houses,
          unoccupied: popCenter.dataValues.unoccupied_houses,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async getDistrict(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const where = {
        [input.dataType]: input.dataValue.toUpperCase(),
      };
      const district = await client.models.districts.findOne({
        where,
      });
      if (district === null) {
        throw new Error('Resource not found');
      }
      return {
        _id: district.dataValues.id,
        province_id: district.dataValues.province_id,
        code: district.dataValues.code,
        name: district.dataValues.name,
        population: {
          total: district.dataValues.total_pop,
          male: district.dataValues.male_pop,
          female: district.dataValues.female_pop,
        },
        houses: {
          total: district.dataValues.total_houses,
          occupied: district.dataValues.occupied_houses,
          unoccupied: district.dataValues.unoccupied_houses,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async getProvince(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const where = {
        [input.dataType]: input.dataValue.toUpperCase(),
      };
      const province = await client.models.provinces.findOne({
        where,
      });
      if (province === null) {
        throw new Error('Resource not found');
      }
      return {
        _id: province.dataValues.id,
        department_id: province.dataValues.department_id,
        code: province.dataValues.code,
        name: province.dataValues.name,
        population: {
          total: province.dataValues.total_pop,
          male: province.dataValues.male_pop,
          female: province.dataValues.female_pop,
        },
        houses: {
          total: province.dataValues.total_houses,
          occupied: province.dataValues.occupied_houses,
          unoccupied: province.dataValues.unoccupied_houses,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async getDepartment(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const where = {
        [input.dataType]: input.dataValue.toUpperCase(),
      };
      const department = await client.models.departments.findOne({
        where,
      });
      if (department === null) {
        throw new Error('Resource not found');
      }
      return {
        _id: department.dataValues.id,
        code: department.dataValues.code,
        name: department.dataValues.name,
        population: {
          total: department.dataValues.total_pop,
          male: department.dataValues.male_pop,
          female: department.dataValues.female_pop,
        },
        houses: {
          total: department.dataValues.total_houses,
          occupied: department.dataValues.occupied_houses,
          unoccupied: department.dataValues.unoccupied_houses,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async getPopCenters(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const where =
        input.dataType !== '' && input.dataValue !== ''
          ? {
              [input.dataType]: input.dataValue.toUpperCase(),
            }
          : {};
      const data = await client.models.popcenters.findAll({
        where,
        attributes: [
          'id',
          'district_id',
          'code',
          'name',
          'natReg',
          'altitude',
          'total_pop',
          'male_pop',
          'female_pop',
          'total_houses',
          'occupied_houses',
          'unoccupied_houses',
        ],
      });
      if (data.length < 1) {
        throw new Error('Resources not found');
      }
      const popCenters = data.map((obj) => {
        return {
          _id: obj.dataValues.id,
          district_id: obj.dataValues.district_id,
          code: obj.dataValues.code,
          name: obj.dataValues.name,
          natReg: obj.dataValues.natReg,
          altitude: obj.dataValues.altitude,
          population: {
            total: obj.dataValues.total_pop,
            male: obj.dataValues.male_pop,
            female: obj.dataValues.female_pop,
          },
          houses: {
            total: obj.dataValues.total_houses,
            occupied: obj.dataValues.occupied_houses,
            unoccupied: obj.dataValues.unoccupied_houses,
          },
        };
      });
      return popCenters;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getDistricts(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const where =
        input.dataType !== '' && input.dataValue !== ''
          ? {
              [input.dataType]: input.dataValue.toUpperCase(),
            }
          : {};
      const data = await client.models.districts.findAll({
        where,
        attributes: [
          'id',
          'province_id',
          'code',
          'name',
          'total_pop',
          'male_pop',
          'female_pop',
          'total_houses',
          'occupied_houses',
          'unoccupied_houses',
        ],
      });
      if (data.length < 1) {
        throw new Error('Resources not found');
      }
      const districts = data.map((obj) => {
        return {
          _id: obj.dataValues.id,
          province_id: obj.dataValues.province_id,
          code: obj.dataValues.code,
          name: obj.dataValues.name,
          population: {
            total: obj.dataValues.total_pop,
            male: obj.dataValues.male_pop,
            female: obj.dataValues.female_pop,
          },
          houses: {
            total: obj.dataValues.total_houses,
            occupied: obj.dataValues.occupied_houses,
            unoccupied: obj.dataValues.unoccupied_houses,
          },
        };
      });
      return districts;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getProvinces(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const where =
        input.dataType !== '' && input.dataValue !== ''
          ? {
              [input.dataType]: input.dataValue.toUpperCase(),
            }
          : {};
      const data = await client.models.provinces.findAll({
        where,
        attributes: [
          'id',
          'department_id',
          'code',
          'name',
          'total_pop',
          'male_pop',
          'female_pop',
          'total_houses',
          'occupied_houses',
          'unoccupied_houses',
        ],
      });
      if (data.length < 1) {
        throw new Error('Resources not found');
      }
      const provinces = data.map((obj) => {
        return {
          _id: obj.dataValues.id,
          department_id: obj.dataValues.department_id,
          code: obj.dataValues.code,
          name: obj.dataValues.name,
          population: {
            total: obj.dataValues.total_pop,
            male: obj.dataValues.male_pop,
            female: obj.dataValues.female_pop,
          },
          houses: {
            total: obj.dataValues.total_houses,
            occupied: obj.dataValues.occupied_houses,
            unoccupied: obj.dataValues.unoccupied_houses,
          },
        };
      });
      return provinces;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getDepartments(_parent, args, { client }) {
    try {
      const { input } = args;
      if (typeof input.dataType === 'undefined' || input.dataType === null) {
        throw new Error('Unexpected value. DATATYPE must be a string but got: ', input.dataType);
      } else if (typeof input.dataValue === 'undefined' || input.dataValue === null) {
        throw new Error(
          'Unexpected value. DATAVALUE must be a string or number but got: ',
          input.dataValue,
        );
      }
      const where =
        input.dataType !== '' && input.dataValue !== ''
          ? {
              [input.dataType]: input.dataValue.toUpperCase(),
            }
          : {};
      const data = await client.models.departments.findAll({
        where,
        attributes: [
          'id',
          'code',
          'name',
          'total_pop',
          'male_pop',
          'female_pop',
          'total_houses',
          'occupied_houses',
          'unoccupied_houses',
        ],
      });
      if (data.length < 1) {
        throw new Error('Resources not found');
      }
      const departments = data.map((obj) => {
        return {
          _id: obj.dataValues.id,
          code: obj.dataValues.code,
          name: obj.dataValues.name,
          population: {
            total: obj.dataValues.total_pop,
            male: obj.dataValues.male_pop,
            female: obj.dataValues.female_pop,
          },
          houses: {
            total: obj.dataValues.total_houses,
            occupied: obj.dataValues.occupied_houses,
            unoccupied: obj.dataValues.unoccupied_houses,
          },
        };
      });
      return departments;
    } catch (err) {
      throw new Error(err);
    }
  },
};
