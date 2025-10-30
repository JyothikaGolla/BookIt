# BookIt: Experiences & Slots

A fullstack booking application for travel experiences and slots.

## Live Demo
- **Frontend (GitHub Pages):** [https://jyothikagolla.github.io/BookIt/](https://jyothikagolla.github.io/BookIt/)
- **Backend (Render):** [https://bookit-b5bj.onrender.com/](https://bookit-b5bj.onrender.com/)

## Features
- Browse curated travel experiences
- View details, available dates, and slots
- Book experiences with form validation
- Apply promo codes for discounts
- See booking confirmation or failure
- Responsive, mobile-friendly UI

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
3. Start backend:
   ```sh
   node index.js
   ```
4. Start frontend:
   ```sh
   cd ../frontend
   npm run dev
   ```

## Deployment
- **Frontend:**
  - Deployed to GitHub Pages using `gh-pages`.
  - Vite config uses `base: '/BookIt/'`.
- **Backend:**
  - Deployed to Render.
  - API URLs in frontend point to Render backend.

## Figma Design
- [Figma Link](https://www.figma.com/design/8X6E1Ev8YdtZ3erV0Iifvb/HD-booking?node-id=01&p=f&t=K4scwnxfIHmfbb2a-0)
