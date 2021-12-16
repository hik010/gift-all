const User = require('../db/models/User');
const { requireToken } = require('./gatekeeping');

const router = require('express').Router();
module.exports = router;


// PUT /api/user ==> to update my user information
router.put('/', requireToken, async(req,res,next) => {
  try {
    const updated = await req.user.update(req.body.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
})
