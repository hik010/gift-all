const db = require('./db')

const User = require('./models/User')
const Item = require('./models/Item')
const Wishlist = require('./models/Wishlist')
const Wishlist_Item = require('./models/wishlist_item')

//associations could go here!
User.hasMany(Wishlist)
Wishlist.belongsTo(User);

Wishlist.belongsToMany(Item, {through: Wishlist_Item})
Item.belongsToMany(Wishlist, {through: Wishlist_Item})



module.exports = {
  db,
  models: {
    User,
    Item,
    Wishlist,
    Wishlist_Item
  },
}
