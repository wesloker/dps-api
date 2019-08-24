const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'earthquakereports',
    {
      id: {
        type: Sequelize.INTEGER,
        field: 'report_id',
        primaryKey: true,
        allowNull: false,
      },
      num: {
        type: Sequelize.INTEGER,
        field: 'num',
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING,
        field: 'date',
        allowNull: false,
      },
      localtime: {
        type: Sequelize.STRING,
        field: 'time',
        allowNull: false,
      },
      lat: {
        type: Sequelize.STRING,
        field: 'lat',
        allowNull: false,
      },
      lng: {
        type: Sequelize.STRING,
        field: 'lng',
        allowNull: false,
      },
      depth: {
        type: Sequelize.INTEGER,
        field: 'depth',
      },
      mag: {
        type: Sequelize.FLOAT,
        field: 'mag',
        allowNull: false,
      },
      intensity: {
        type: Sequelize.STRING,
        field: 'intensity',
      },
    },
    {
      timestamps: false,
      name: {
        singular: 'report',
        plural: 'reports',
      },
    },
  );
};
