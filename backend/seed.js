/**
 * Enhanced seed script to create sample experiences, slots, and promo codes.
 * Run: node seed.js  (ensure MONGODB_URI is set or use .env)
 */
require('dotenv').config();
const { MongoClient } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookit';

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();
  const experiences = db.collection('experiences');
  const promos = db.collection('promos');
  const bookings = db.collection('bookings');

  await experiences.deleteMany({});
  await promos.deleteMany({});
  await bookings.deleteMany({});

  const sample = [
    {
      title: 'Kayaking',
      slug: 'kayaking',
      short: 'Paddle through scenic backwaters with a certified guide. All safety gear provided.',
      price: 800,
      duration: '2 hours',
      image: 'https://cdn.pixabay.com/photo/2017/06/08/23/02/canoe-kayak-2385203_960_720.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Enjoy a beginner-friendly kayaking adventure in Udupi. Perfect for small groups, with all equipment and safety instructions included.',
      category: 'Adventure',
      location: 'Udupi',
      slots: [
  {id: 's1', date: '2025-11-05', time: '06:00', capacity: 6},
  {id: 's2', date: '2025-11-06', time: '06:00', capacity: 6},
  {id: 's1b', date: '2025-11-05', time: '09:00', capacity: 4},
  {id: 's2b', date: '2025-11-06', time: '09:00', capacity: 4},
  {id: 's1c', date: '2025-11-05', time: '11:00', capacity: 3},
  {id: 's2c', date: '2025-11-06', time: '11:00', capacity: 3}
      ]
    },
    {
      title: 'Nandi Hills Sunrise',
      slug: 'nandi-hills-sunrise',
      short: 'Witness a breathtaking sunrise atop Nandi Hills with expert guidance.',
      price: 1200,
      duration: '2 hours',
      image: 'https://i.ytimg.com/vi/Vj9Uizrgszs/maxresdefault.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Join a guided morning trek to Nandi Hills and experience the beauty of dawn. Includes group safety, local stories, and refreshments.',
      category: 'Adventure',
      location: 'Bangalore',
      slots: [
  {id: 's3', date: '2025-11-08', time: '06:00', capacity: 12},
  {id: 's3b', date: '2025-11-08', time: '09:00', capacity: 10},
  {id: 's3c', date: '2025-11-08', time: '11:00', capacity: 8},
  {id: 's4', date: '2025-11-09', time: '06:00', capacity: 12},
  {id: 's4b', date: '2025-11-09', time: '09:00', capacity: 10},
  {id: 's4c', date: '2025-11-09', time: '11:00', capacity: 8}
      ]
    },
    {
      title: 'Coffee Trail',
      slug: 'coffee-trail',
      short: 'Explore lush coffee estates and learn about coffee making in Coorg.',
      price: 900,
      duration: '3 hours',
      image: 'https://blog.lohono.com/wp-content/uploads/2025/02/Facade2-edited.jpeg?auto=format&fit=crop&w=800&q=80',
      description: 'Walk through scenic plantations, discover the journey from bean to brew, and enjoy tastings with a local expert.',
      category: 'Food & Dining',
      location: 'Coorg',
      slots: [
  {id: 's5', date: '2025-11-10', time: '09:00', capacity: 15},
  {id: 's5b', date: '2025-11-10', time: '11:00', capacity: 10},
  {id: 's5c', date: '2025-11-10', time: '14:00', capacity: 8},
  {id: 's6', date: '2025-11-17', time: '09:00', capacity: 15},
  {id: 's6b', date: '2025-11-17', time: '11:00', capacity: 10},
  {id: 's6c', date: '2025-11-17', time: '14:00', capacity: 8}
      ]
    },
    {
      title: 'Hot Air Balloon Ride',
      slug: 'hot-air-balloon-ride',
      short: 'Soar above the landscape in a hot air balloon. Certified pilot. Safety first.',
      price: 3500,
      duration: '2 hours',
      image: 'https://www.adventurush.com/wp-content/uploads/2022/07/4-6-768x421.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Enjoy breathtaking views and a peaceful ride above Jaipur.',
      category: 'Adventure',
      location: 'Jaipur',
      slots: [
  {id: 's31', date: '2025-12-04', time: '06:00', capacity: 8},
  {id: 's31b', date: '2025-12-04', time: '09:00', capacity: 6},
  {id: 's31c', date: '2025-12-04', time: '11:00', capacity: 4},
  {id: 's32', date: '2025-12-05', time: '06:00', capacity: 8},
  {id: 's32b', date: '2025-12-05', time: '09:00', capacity: 6},
  {id: 's32c', date: '2025-12-05', time: '11:00', capacity: 4}
      ]
    },
    {
      title: 'Village Pottery Workshop',
      slug: 'village-pottery-workshop',
      short: 'Create pottery with local artisans. Certified instructor. Safety first.',
      price: 500,
      duration: '2 hours',
      image: 'https://theabroadguide.com/wp-content/uploads/2025/06/1_thanh-ha-village-pottery-workshop-with-locals.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Learn traditional pottery techniques in a rural setting.',
      category: 'Arts & Crafts',
      location: 'Kutch',
      slots: [
        {id: 's33', date: '2025-12-06', time: '10:00', capacity: 10},
        {id: 's34', date: '2025-12-07', time: '10:00', capacity: 10}
      ]
    },
    {
      title: 'Wildlife Safari',
      slug: 'wildlife-safari',
      short: 'Spot wildlife in their natural habitat. Certified guide. Safety first.',
      price: 1200,
      duration: '3 hours',
      image: 'https://assets.gqindia.com/photos/604c5d2840ec5beed755731e/master/pass/wildlife%20safari%20destinations%20in%20India.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Explore Ranthambore National Park and see tigers, deer, and more.',
      category: 'Nature',
      location: 'Ranthambore',
      slots: [
        {id: 's35', date: '2025-12-08', time: '07:00', capacity: 12},
        {id: 's36', date: '2025-12-09', time: '07:00', capacity: 12}
      ]
    },
    {
      title: 'Forest Walk',
      slug: 'forest-walk',
      short: 'Guided walk through lush forests. Certified guide. Safety first.',
      price: 700,
      duration: '2 hours',
      image: 'https://lifeandtrendz.com/wp-content/uploads/2021/08/Walking-in-the-forest-1.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Explore the flora and fauna of the Western Ghats with a naturalist.',
      category: 'Nature',
      location: 'Western Ghats',
      slots: [
        {id: 's7', date: '2025-11-14', time: '07:00', capacity: 15},
        {id: 's8', date: '2025-11-15', time: '07:00', capacity: 15}
      ]
    },
    {
      title: 'Heritage Cycling Tour',
      slug: 'heritage-cycling',
      short: 'Cycle through historic sites. Certified guide. Safety first.',
      price: 1000,
      duration: '3 hours',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlWsw4ovBxlNEslHzlwYY9eQBKsO5EAEhEZg&s?auto=format&fit=crop&w=800&q=80',
      description: 'Discover the heritage of Mysore on a guided cycling tour.',
      category: 'Culture',
      location: 'Mysore',
      slots: [
        {id: 's9', date: '2025-11-16', time: '08:00', capacity: 20},
        {id: 's10', date: '2025-11-17', time: '08:00', capacity: 20}
      ]
    },
    {
      title: 'Street Food Safari',
      slug: 'street-food-safari',
      short: 'Taste the best street food. Certified guide. Safety first.',
      price: 600,
      duration: '2 hours',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuWwGryOyTHwtZmnXRNB2DMgk-dE2eczLKA&s?auto=format&fit=crop&w=800&q=80',
      description: 'Sample delicious street food in Old Delhi with a local expert.',
      category: 'Food & Dining',
      location: 'Old Delhi',
      slots: [
  {id: 's11', date: '2025-11-18', time: '18:00', capacity: 10},
  {id: 's11b', date: '2025-11-18', time: '20:00', capacity: 8},
  {id: 's11c', date: '2025-11-18', time: '22:00', capacity: 6},
  {id: 's12', date: '2025-11-19', time: '18:00', capacity: 10},
  {id: 's12b', date: '2025-11-19', time: '20:00', capacity: 8},
  {id: 's12c', date: '2025-11-19', time: '22:00', capacity: 6}
      ]
    },
    {
      title: 'Photography Walk',
      slug: 'photography-walk',
      short: 'Learn photography tips. Certified guide. Safety first.',
      price: 800,
      duration: '2 hours',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6lA1iuBnloQDCQFfU09xBmQQTCQSD2Tq8sA&s?auto=format&fit=crop&w=800&q=80',
      description: 'Capture the beauty of Pondicherry with a professional photographer.',
      category: 'Photography',
      location: 'Pondicherry',
      slots: [
  {id: 's13', date: '2025-11-20', time: '16:00', capacity: 12},
  {id: 's13b', date: '2025-11-20', time: '18:00', capacity: 10},
  {id: 's13c', date: '2025-11-20', time: '20:00', capacity: 8},
  {id: 's14', date: '2025-11-21', time: '16:00', capacity: 12},
  {id: 's14b', date: '2025-11-21', time: '18:00', capacity: 10},
  {id: 's14c', date: '2025-11-21', time: '20:00', capacity: 8}
      ]
    },
    {
      title: 'Mountain Trek',
      slug: 'mountain-trek',
      short: 'Guided trek in the Himalayas. Certified guide. Safety first.',
      price: 1500,
      duration: '4 hours',
      image: 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2015/02/Intrepid-Travel-Chile-Patagonia-trekking-002.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Trek through scenic Himalayan trails with an expert guide.',
      category: 'Adventure',
      location: 'Himalayas',
      slots: [
  {id: 's15', date: '2025-11-22', time: '08:00', capacity: 15},
  {id: 's15b', date: '2025-11-22', time: '10:00', capacity: 12},
  {id: 's15c', date: '2025-11-22', time: '12:00', capacity: 10},
  {id: 's16', date: '2025-11-23', time: '08:00', capacity: 15},
  {id: 's16b', date: '2025-11-23', time: '10:00', capacity: 12},
  {id: 's16c', date: '2025-11-23', time: '12:00', capacity: 10}
      ]
    },
    {
      title: 'Desert Safari',
      slug: 'desert-safari',
      short: 'Thrilling ride in the desert. Certified guide. Safety first.',
      price: 1800,
      duration: '3 hours',
      image: 'https://www.dubaidesertsafaris.com/wp-content/uploads/2025/02/8c5c729447979c8e69df69bfcf41996c.webp?auto=format&fit=crop&w=800&q=80',
      description: 'Experience the thrill of a desert safari in Rajasthan.',
      category: 'Adventure',
      location: 'Rajasthan',
      slots: [
  {id: 's17', date: '2025-11-24', time: '17:00', capacity: 20},
  {id: 's17b', date: '2025-11-24', time: '19:00', capacity: 15},
  {id: 's17c', date: '2025-11-24', time: '21:00', capacity: 10},
  {id: 's18', date: '2025-11-25', time: '17:00', capacity: 20},
  {id: 's18b', date: '2025-11-25', time: '19:00', capacity: 15},
  {id: 's18c', date: '2025-11-25', time: '21:00', capacity: 10}
      ]
    },
    {
      title: 'City Lights Night Tour',
      slug: 'city-lights-night-tour',
      short: 'Explore the city after dark. Certified guide. Safety first.',
      price: 999,
      duration: '2 hours',
      image: 'https://mumbaidreamtours.com/wp-content/gallery/night-life/11904535_426186674251622_9136107910295279995_n.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'See the best city sights illuminated at night with a local guide.',
      category: 'Culture',
      location: 'Mumbai',
      slots: [
  {id: 's19', date: '2025-11-26', time: '20:00', capacity: 15},
  {id: 's19b', date: '2025-11-26', time: '22:00', capacity: 10},
  {id: 's19c', date: '2025-11-26', time: '23:30', capacity: 8},
  {id: 's20', date: '2025-11-27', time: '20:00', capacity: 15},
  {id: 's20b', date: '2025-11-27', time: '22:00', capacity: 10},
  {id: 's20c', date: '2025-11-27', time: '23:30', capacity: 8}
      ]
    },
    {
      title: 'River Rafting',
      slug: 'river-rafting',
      short: 'Exciting river adventure. Certified guide. Safety first.',
      price: 1099,
      duration: '3 hours',
      image: 'https://www.holidify.com/images/cmsuploads/articles/287.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Enjoy a thrilling river rafting experience in Rishikesh.',
      category: 'Adventure',
      location: 'Rishikesh',
      slots: [
  {id: 's21', date: '2025-11-28', time: '09:00', capacity: 12},
  {id: 's21b', date: '2025-11-28', time: '11:00', capacity: 10},
  {id: 's21c', date: '2025-11-28', time: '13:00', capacity: 8},
  {id: 's22', date: '2025-11-29', time: '09:00', capacity: 12},
  {id: 's22b', date: '2025-11-29', time: '11:00', capacity: 10},
  {id: 's22c', date: '2025-11-29', time: '13:00', capacity: 8}
      ]
    },
    {
      title: 'Tea Estate Walk',
      slug: 'tea-estate-walk',
      short: 'Walk through lush tea estates. Certified guide. Safety first.',
      price: 999,
      duration: '2 hours',
      image: 'https://media1.thrillophilia.com/filestore/ikol5k7h92uycd140g9lvk71bobq_shutterstock_2407127233.jpg?w=400&dpr=2?auto=format&fit=crop&w=800&q=80',
      description: 'Learn about tea cultivation and taste fresh tea in Munnar.',
      category: 'Nature',
      location: 'Munnar',
      slots: [
  {id: 's23', date: '2025-11-30', time: '10:00', capacity: 10},
  {id: 's23b', date: '2025-11-30', time: '12:00', capacity: 8},
  {id: 's23c', date: '2025-11-30', time: '14:00', capacity: 6},
  {id: 's24', date: '2025-12-01', time: '10:00', capacity: 10},
  {id: 's24b', date: '2025-12-01', time: '12:00', capacity: 8},
  {id: 's24c', date: '2025-12-01', time: '14:00', capacity: 6}
      ]
    },
    {
      title: 'Cultural Dance Show',
      slug: 'cultural-dance-show',
      short: 'Experience traditional dance. Certified guide. Safety first.',
      price: 1199,
      duration: '2 hours',
      image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/9d/63/20.jpg?auto=format&fit=crop&w=800&q=80',
      description: 'Watch and learn about traditional dance forms in Kerala.',
      category: 'Culture',
      location: 'Kochi',
      slots: [
  {id: 's25', date: '2025-12-02', time: '18:00', capacity: 20},
  {id: 's25b', date: '2025-12-02', time: '20:00', capacity: 15},
  {id: 's25c', date: '2025-12-02', time: '22:00', capacity: 10},
  {id: 's26', date: '2025-12-03', time: '18:00', capacity: 20},
  {id: 's26b', date: '2025-12-03', time: '20:00', capacity: 15},
  {id: 's26c', date: '2025-12-03', time: '22:00', capacity: 10}
      ]
    }
  ];

  await experiences.insertMany(sample);
  await promos.insertMany([
    {code: 'SAVE10', type: 'percent', amount: 10},
    {code: 'FLAT100', type: 'flat', amount: 100},
    {code: 'WELCOME5', type: 'percent', amount: 5}
  ]);

  console.log('Seeded enhanced database with multiple experiences and promos.');
  await client.close();
}

seed().catch(err=>{console.error(err); process.exit(1);});
