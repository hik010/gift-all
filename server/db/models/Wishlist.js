const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Wishlist = db.define('wishlist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('private', 'public'),
    defaultValue: 'private'
  }
})

module.exports = Wishlist
