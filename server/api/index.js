const router = require('express').Router();

module.exports = router;

router.use('/etsy', require('./etsy'))
router.use('/user', require('./users'))


router.use((req,res,next) => {
  const error = new Error('Route not found in api router')
  error.status = 404
  next(error)
})
