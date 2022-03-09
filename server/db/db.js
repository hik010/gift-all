const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const databaseName = process.env.NODE_ENV === 'production' ? 'stackathon' : pkg.name;

const config = {
  logging: false,
  dialect: process.env.DB_DIALECT
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
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  config
);
module.exports = db;
