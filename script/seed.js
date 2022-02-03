'use strict';

const {
  db,
  models: { User, Item, Wishlist_Item, Wishlist },
} = require('../server/db');

const itemsJson = require('./sampleItems.json')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ email: 'cody@gmail.com', password: '123' }),
    User.create({ email: 'murphy@gmail.com', password: '123' }),
  ]);


  // const item2 = await Item.create();
  const items = await Promise.all(itemsJson.map(item => Item.create(item)));

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${items.length} items`);
  console.log(`seeded successfully`);

  await Wishlist_Item.create({ wishlistId: 1, itemId: items[0].id, quantity: 2 });
  await Wishlist_Item.create({ wishlistId: 2, itemId: items[1].id, quantity: 1 });
  await Wishlist_Item.create({ wishlistId: 2, itemId: items[2].id, quantity: 1 });

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
