const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Wishlist_Item = db.define('wishlist_item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  note: {
    type: Sequelize.STRING
  }
})

module.exports = Wishlist_Item
