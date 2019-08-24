const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'districts',
    {
      id: {
        type: Sequelize.INTEGER,
        field: 'district_id',
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.INTEGER,
        field: 'code',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false,
      },
      total_pop: {
        type: Sequelize.INTEGER,
        field: 'total_pop',
        allowNull: false,
      },
      male_pop: {
        type: Sequelize.INTEGER,
        field: 'male_pop',
        allowNull: false,
      },
      female_pop: {
        type: Sequelize.INTEGER,
        field: 'female_pop',
        allowNull: false,
      },
      total_houses: {
        type: Sequelize.INTEGER,
        field: 'total_houses',
        allowNull: false,
      },
      occupied_houses: {
        type: Sequelize.INTEGER,
        field: 'occupied_houses',
        allowNull: false,
      },
      unoccupied_houses: {
        type: Sequelize.INTEGER,
        field: 'unoccupied_houses',
        allowNull: false,
      },
    },
    {
      timestamps: false,
      name: {
        singular: 'district',
        plural: 'districts',
      },
    },
  );
};
