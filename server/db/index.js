const db = require('./db')

const User = require('./models/User')
const Item = require('./models/Item')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Item
  },
}
