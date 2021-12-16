const router = require('express').Router();
const {models:{Wishlist, Item}} = require('../db');
const { requireToken } = require('./gatekeeping');

module.exports = router;


// GET /api/wishlist
router.get('/', requireToken, async(req,res,next) => {
  try {
    const allLists = await Wishlist.findAll({
      where: {userId: req.user.id},
      include: [Item]
    });
    res.json(allLists);
  } catch (err) {
    next(err);
  }
})

// GET /api/wishlist/:id
router.get('/:id', requireToken, async(req,res,next) => {
  try {
    const singleList = await Wishlist.findOne({
      where: {id: req.params.id},
      include: [Item]
    });
    res.json(singleList);
  } catch (err) {
    next(err);
  }
})
