require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookit';
const PORT = process.env.PORT || 4000;
const client = new MongoClient(MONGODB_URI);

async function start() {
  await client.connect();
  const db = client.db();
  const experiences = db.collection('experiences');
  const bookings = db.collection('bookings');
  const promos = db.collection('promos');

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // GET /experiences
  app.get('/experiences', async (req, res) => {
    const list = await experiences.find().toArray();
    res.json(list);
  });

  // GET /experiences/search
  app.get('/experiences/search', async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) return res.json([]);

      const query = { 
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      };

      const list = await experiences.find(query).toArray();
      res.json(list);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // GET /experiences/:id
  app.get('/experiences/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const exp = await experiences.findOne({_id: new ObjectId(id)});
      if (!exp) return res.status(404).json({error: 'Not found'});
      // compute availability: filter out booked slots
      const booked = await bookings.find({experienceId: id}).toArray();
      const bookedSlots = booked.map(b => b.slotId);
      // map slots with availability
      const slots = (exp.slots || []).map(s => ({...s, available: !bookedSlots.includes(s.id)}));
      res.json({...exp, slots});
    } catch (e) {
      console.error(e);
      res.status(400).json({error: 'Invalid id'});
    }
  });

  // POST /promo/validate
  app.post('/promo/validate', async (req, res) => {
    const {code} = req.body;
    if(!code) return res.status(400).json({valid:false});
    const promo = await promos.findOne({code: code.toUpperCase()});
    if(!promo) return res.json({valid:false});
    res.json({valid:true, discountType: promo.type, amount: promo.amount});
  });

  // POST /bookings
  app.post('/bookings', async (req, res) => {
    const {experienceId, slotId, user} = req.body;
    if(!experienceId || !slotId || !user || !user.name || !user.email) {
      return res.status(400).json({error: 'Missing fields'});
    }
    // atomic check and insert to prevent double booking:
    const session = client.startSession();
    try {
      let resultBooking = null;
      await session.withTransaction(async () => {
        // check if slot already booked
        const exists = await bookings.findOne({experienceId, slotId}, {session});
        if(exists) throw new Error('Slot already booked');
        // insert booking
        const bookingDoc = {
          experienceId,
          slotId,
          user,
          createdAt: new Date().toISOString(),
          confirmationId: require('uniqid')()
        };
        const insert = await bookings.insertOne(bookingDoc, {session});
        resultBooking = bookingDoc;
      });
      res.json({success:true, booking: resultBooking});
    } catch (e) {
      if(e.message === 'Slot already booked') {
        res.status(409).json({success:false, error:'Slot already booked'});
      } else {
        console.error(e);
        res.status(500).json({success:false, error:'Server error'});
      }
    } finally {
      await session.endSession();
    }
  });

  app.listen(PORT, ()=> console.log('Backend listening on', PORT));
}

start().catch(err=>{
  console.error('Failed to start', err);
  process.exit(1);
});
