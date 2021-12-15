const {
  models: { User, Item, Wishlist_Item, Wishlist },
  models,
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    let token;
    if(req.method == 'PUT' || req.method =='POST') {
      token = req.body.headers.authorization;
    } else token = req.headers.authorization
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
