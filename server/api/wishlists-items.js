const { requireToken } = require('./gatekeeping');

const {
  models: { Item, Wishlist_Item },
} = require('../db');

const router = require('express').Router();

module.exports = router;

// POST /api/wishlist-item
router.post('/', requireToken, async (req, res, next) => {
  try {
    // create item with item data
    const { wishlistId, itemData } = req.body;
    let [item, created] = await Item.findOrCreate({
      where: {
        price: itemData.price,
        title: itemData.title,
        source: itemData.source,
      },
      defaults: itemData,
    });

    // create entry in wishlist-items
    let new_entry = await Wishlist_Item.create({
      itemId: item.id,
      wishlistId,
      quantity: itemData.quantity,
      note: itemData.note,
    });

    res.json(new_entry);
  } catch (e) {
    next(e);
  }
});

// PUT /api/wishlist-item
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
    const { wishlistId, itemId } = req.body;
    let toDestroy = await Wishlist_Item.findOne({
      where: {
        wishlistId,
        itemId,
      },
    });

    await toDestroy.destroy();
    res.json(toDestroy);
  } catch (e) {
    next(e);
  }
});
