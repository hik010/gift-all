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

  const item = await Item.create({
    product_id: '923925068',
    title: 'Dainty Circular Stud Earrings  Handmade Jewelry  Sterling | Etsy',
    source: 'etsy',
    price: 28.88,
    rating: 4.9013,
    image:
      'https://i.etsystatic.com/26061027/r/il/b7d84a/2777550040/il_794xN.2777550040_hhka.jpg',
    link: 'https://www.etsy.com/listing/923925068/dainty-circular-stud-earrings-handmade?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=&ref=sc_gallery-1-1&pro=1&frs=1&listing_id=923925068&listing_slug=dainty-circular-stud-earrings-handmade&plkey=0f892ae9cb34310db9aa863fb42053ade0819c55%3A923925068',
  });

  const item2 = await Item.create({
    product_id: '8325939041364383439',
    title: "Minecraft 'Squid' Glow in The Dark Pillow Buddy",
    price: 15.96,
    rating: 4.8,
    image:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT2GdqJ54U0jJ3h4W0ty1QjcAoU5sVunMQ49K0mF0OJw5f75X9DWJU13r9dQQIRgg8oRJbKy9jm&usqp=CAY',
    link: 'https://www.google.com/url?q=https://www.walmart.com/ip/Minecraft-Kids-Squid-Bedding-Plush-Cuddle-and-Decorative-Glow-In-The-Dark-Pillow-Buddy-100-Polyester-Blue-Mojang/228077326%3Fwl13%3D5152%26selectedSellerId%3D0&sa=U&ved=0ahUKEwjyn6v7j-f0AhXmIjQIHQ22Dv4Qx50ICCk&usg=AOvVaw12oFKeTSOpFfsAOCyacHvL',
    source: 'Walmart',
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  await Wishlist_Item.create({ wishlistId: 1, itemId: item.id, quantity: 2 });

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
