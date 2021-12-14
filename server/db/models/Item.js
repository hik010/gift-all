const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');


const Item = db.define('item', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: Sequelize.ENUM('etsy', 'others'),
    validate: {
      isIn: [['etsy','others']]
    },
    defaultValue: 'etsy'
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price : {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  num_sales: {
    type: Sequelize.INTEGER
  },
  rating: {
    type: Sequelize.DECIMAL
  },
  image: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true
    }
  },

})

module.exports = Item
