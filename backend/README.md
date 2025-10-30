# Backend (Express + MongoDB)

Setup:
1. Copy .env.example to .env and update MONGODB_URI (default: mongodb://localhost:27017/bookit)
2. npm install
3. npm run seed    # to populate sample data
4. npm start

API endpoints:
- GET /experiences
- GET /experiences/:id
- POST /promo/validate   { code }
- POST /bookings         { experienceId, slotId, user: {name,email,phone} }

Notes:
- Uses MongoDB driver and simple transactions to avoid double-booking.
