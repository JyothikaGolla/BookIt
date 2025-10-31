# BookIt: Experiences & Slots

A fullstack booking application for travel experiences and slots.

## Live Demo
- **Frontend (Render):** [https://bookit-3-znqb.onrender.com](https://bookit-3-znqb.onrender.com)
- **Backend (Render):** [https://bookit-2-tugn.onrender.com](https://bookit-2-tugn.onrender.com)

## Features
- Browse curated travel experiences
- View details, available dates, and slots
- Book experiences with form validation
- Apply promo codes for discounts
- See booking confirmation or failure
- Responsive, mobile-friendly UI
- Modern hover effects on cards and buttons

## Tech Stack
- **Frontend:** React + TypeScript + Vite + TailwindCSS
- **Backend:** Node.js + Express + MongoDB
- **APIs:**
  - `GET /experiences`
  - `GET /experiences/:id`
  - `POST /bookings`
  - `POST /promo/validate`

## Setup & Run Locally
1. Clone the repo:
   ```sh
   git clone https://github.com/JyothikaGolla/BookIt.git
   ```
2. Install dependencies:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Set up environment variables:
   - Copy the example file to create your own `.env` file:
     ```sh
     copy backend\.env.example backend\.env
     ```
     (On Mac/Linux use: `cp backend/.env.example backend/.env`)
   - Open `backend/.env` and update the values (e.g., your MongoDB connection string).
4. Start backend:
   ```sh
   node index.js
   ```
5. Start frontend:
   ```sh
   cd ../frontend
   npm run dev
   ```

## Deployment
- **Frontend:**
   - Deployed to Render as a Static Site.
   - Vite config uses `base: '/'` for Render deployment.
- **Backend:**
   - Deployed to Render as a Web Service.
   - API URLs in frontend point to Render backend.

## Figma Design
- [Figma Link](https://www.figma.com/design/8X6E1Ev8YdtZ3erV0Iifvb/HD-booking?node-id=01&p=f&t=K4scwnxfIHmfbb2a-0)
