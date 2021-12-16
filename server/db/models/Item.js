const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Item = db.define('item', {
  product_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'custom',
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  rating: {
    type: Sequelize.DECIMAL,
  },
  image: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true,
    },
    defaultValue: 'https://image.shutterstock.com/image-vector/new-item-sign-stamp-on-260nw-1773071672.jpg'
  },
  link: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Item;
