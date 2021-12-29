const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const { parsed } = require('dotenv').config('../../.env');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const config = {
  logging: false,
  dialect: parsed.DB_DIALECT
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.NODE_ENV === 'production') {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   config
// );
const db = new Sequelize(
  parsed.DB_DATABASE,
  parsed.DB_USERNAME,
  parsed.DB_PASSWORD,
  config
);
module.exports = db;
