const {
  models: { User, Item, Wishlist_Item, Wishlist },
  models,
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
};
