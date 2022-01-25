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
  },
  receiver: {
    type: Sequelize.ENUM('me', 'others'),
    defaultValue: 'me'
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  note: {
    type: Sequelize.TEXT,
  },
  occasion: {
    type: Sequelize.STRING,
    defaultValue: 'misc'
  },
  occurrence: {
    type: Sequelize.ENUM('one-time', 'monthly', 'yearly'),
    defaultValue: 'one-time'
  }
})

module.exports = Wishlist
