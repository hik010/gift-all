const db = require('./db')

const User = require('./models/User')

//associations could go here!

module.exports = {
  db,
  models: {
    User
  },
}
