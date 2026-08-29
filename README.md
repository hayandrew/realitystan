# RealityStan 🌌

A modern, dynamic reality TV show dashboard and voting simulator bootstrapped with Next.js and Mongoose. Currently themed as the **Star Wars Big Brother** tracker, RealityStan allows fans and viewers to track, update, and simulate weekly voting logic, evictions, and Head of Household (HOH) rules in real time.

---

## 🚀 Features

- **Dynamic Leaderboard**: Track the current **Head of Household (HOH)** and **Nominees** dynamically.
- **Interactive Voting Simulator**: Cast/change votes for active houseguests, with real-time recalculations of votes.
- **Auto Eviction Detection**: Calculates when a nominee has reached the majority threshold of votes and triggers a dramatic eviction modal.
- **MongoDB + Mongoose Integration**: Seamless connection to a MongoDB database to store shows, participants, and weekly statuses.
- **Static Fallback Data**: Fully functional offline or without database configuration using integrated mock data fallbacks.
- **Modern Responsive Design**: Pure CSS custom properties (variables), custom fonts, and fully responsive layouts that look stunning on any device.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Styling**: Vanilla CSS with custom property themes
- **Dropdowns**: [React Select](https://react-select.com/)

---

## 📋 Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18.x or higher recommended)
- **MongoDB** (running locally, or a remote MongoDB Atlas URI)

---

## ⚙️ Setup and Installation

### 1. Clone the repository and install dependencies
```bash
git clone https://github.com/hayandrew/realitystan.git
cd realitystan
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory. You can copy the template provided:
```bash
cp .env.local.example .env.local
```
Open `.env.local` and specify your MongoDB URI:
```env
MONGODB_URI=mongodb://localhost:27017/bbstan
```
*Note: If no `MONGODB_URI` is provided, the application will automatically fall back to static mockup data, so you can still run and explore the application without a database.*

### 3. Seed the Database
To populate your MongoDB database with the default show data (Star Wars characters, default Nominees, and Head of Households), run:
```bash
npm run db:seed
```

---

## 💻 Running the Application

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the dashboard.

---

## 🗂️ Project Structure

```text
realitystan/
├── scripts/
│   └── seed.js             # Database seed script for MongoDB
├── src/
│   ├── app/
│   │   ├── api/            # Serverless API routes
│   │   ├── App.css         # Main application styles
│   │   ├── theme.css       # CSS custom properties and color palettes
│   │   └── page.js         # Core application shell & state machine
│   ├── components/         # Reusable React components (Header, Footer, Overlay, People, etc.)
│   ├── data/
│   │   └── staticData.js   # Static mock data fallback
│   └── lib/
│       └── mongodb.js      # MongoDB connector and Mongoose schemas
```

---

## 🧪 Development & Deployment

- **Linting**: Run `npm run lint` to check for style/code issues.
- **Production Build**: Run `npm run build` to build the optimized production bundles.
- **Deployment**: The repository is fully optimized for one-click deployment on [Vercel](https://vercel.com). Make sure to add `MONGODB_URI` to your project's Environment Variables in the Vercel dashboard.

