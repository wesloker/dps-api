module.exports = ({ models: { departments, provinces, districts, popcenters } }) => {
  departments.hasMany(provinces, { foreignKey: 'department_id', as: 'provinces' });
  provinces.belongsTo(departments, { foreignKey: 'department_id' });

  provinces.hasMany(districts, { foreignKey: 'province_id', as: 'districts' });
  districts.belongsTo(provinces, { foreignKey: 'province_id' });

  districts.hasMany(popcenters, { foreignKey: 'district_id', as: 'popcenters' });
  popcenters.belongsTo(districts, { foreignKey: 'district_id' });
};
