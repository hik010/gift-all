const router = require('express').Router();
const { spawn } = require('child_process');
const path = require('path');
const Item = require('../db/models/Item');

module.exports = router;

const pythonPromise = data => {
  let scriptPath = path.join(__dirname, '..', '..', 'script', 'scrape.py');
  let pythonPath = 'python3'
  return new Promise((resolve, reject) => {
    const python = spawn(pythonPath, [scriptPath, ...data]);

    python.stdout.on('data', data => {
      resolve(data.toString());
    });

    python.stderr.on('data', data => {
      reject(data.toString());
    });
  });
};

// GET /api/scrape
router.get('/', async (req, res, next) => {
  try {
    // check if this is inside database already
    let product_id;
    if(req.headers.formtype === 'Etsy') {
      product_id = req.headers.link.split('listing/')[1].split('/')[0];
    } else {
      // google shopping link
      product_id = req.headers.link.split('/product/')[1].split('?')[0];
    }

    // use redis here later
    let found = await Item.findOne({
      where: {product_id : product_id}
    });
    if (found) return res.json(found);

    // if not found yet, scrape from etsy
    let dataFromPython = await pythonPromise([req.headers.link]);
    res.json(JSON.parse(dataFromPython));
  } catch (err) {
    console.log(err)
    next(err);
  }
});
