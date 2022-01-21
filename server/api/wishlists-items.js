const { requireToken } = require('./gatekeeping');

const {
  models: { Item, Wishlist_Item },
} = require('../db');
const Wishlist = require('../db/models/Wishlist');

const router = require('express').Router();

module.exports = router;

// POST /api/wishlist-item => add an item to list
router.post('/', requireToken, async (req, res, next) => {
  try {
    // create item with item data
    const { wishlistId, itemData } = req.body;
    let item;
    // if itemData.id exists, no need to create, created in etsy.js
    if (!itemData.id) {
      item = await Item.create(itemData);
    } else item = itemData; //if custom item -> create

    // create entry in wishlist-items
    let new_entry = await Wishlist_Item.create({
      itemId: item.id,
      wishlistId: wishlistId,
      quantity: itemData.quantity || 1,
    });

    let itemReturn = { ...item, wishlist_item: {...new_entry} };
    res.json(itemReturn);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// PUT /api/wishlist-item update quantity
router.put('/', requireToken, async (req, res, next) => {
  try {
    // delete one entry, need to know item id and wishlist id
    const { wishlistId, itemData } = req.body;
    let [numUpdated, updated] = await Wishlist_Item.update(itemData, {
      where: {
        wishlistId,
        itemId: itemData.id,
      },
      returning: true,
    });

    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE /api/wishlist-item
router.delete('/', requireToken, async (req, res, next) => {
  try {
    // delete one entry, need to know item id and wishlist id
    const { wishlistId, itemData } = req.body;
    let toDestroy = await Wishlist_Item.findOne({
      where: {
        wishlistId,
        itemId: itemData.id,
      },
    });

    await toDestroy.destroy();
    res.json(toDestroy);
  } catch (e) {
    next(e);
  }
});
