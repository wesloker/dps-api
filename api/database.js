const Sequelize = require('sequelize');
const pg = require('pg');

const buildSchemas = require('./models/schemas/');
const makeRelations = require('./models/associations/');

module.exports = async ({ DATABASE_URL }, NODE_ENV) => {
  pg.defaults.ssl = NODE_ENV === 'production';
  const sequelize = await new Sequelize(DATABASE_URL, {
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    logging: false,
    ssl: true,
  });
  await buildSchemas(sequelize);
  await makeRelations(sequelize);
  return sequelize;
};
