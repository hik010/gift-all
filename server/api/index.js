const router = require('express').Router();

module.exports = router;

router.use('/scrape', require('./etsy'))
router.use('/user', require('./users'))
router.use('/wishlist', require('./wishlists'))
router.use('/wishlist-item', require('./wishlists-items'))


router.use((req,res,next) => {
  const error = new Error('Route not found in api router')
  error.status = 404
  next(error)
})
