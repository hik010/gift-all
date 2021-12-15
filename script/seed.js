'use strict';

const {
  db,
  models: { User, Item, Wishlist_Item, Wishlist },
} = require('../server/db');

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

  const items = await Item.create({
    id: 923925068,
    title: 'Dainty Circular Stud Earrings  Handmade Jewelry  Sterling | Etsy',
    price: 28.88,
    num_sales: 3220,
    rating: 4.9013,
    image:
      'https://i.etsystatic.com/26061027/r/il/b7d84a/2777550040/il_794xN.2777550040_hhka.jpg',
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  await Wishlist_Item.create({wishlistId: 1, itemId: items.id, quantity: 3})

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
