
# Expenses Tracker

A small Vite + React frontend with an Express + Mongoose backend for tracking expenses. This repository contains the frontend app (Vite + React) in `src/` and a lightweight backend in `src/back/`.

## Contents

- `src/` — frontend React app (Vite)
- `src/back/` — backend (Express, Mongoose)
- `src/back/configs/` — DB and other backend configs (e.g. `db_config.js`)
- `public/` — static public assets
- `package.json` — project scripts and dependencies

## Prerequisites

- Node.js (16+ recommended)
- npm (or yarn)
- MongoDB instance (local or hosted) — connection string required in environment variables

## Quick start

1. Clone the repo and install dependencies:

```powershell
git clone https://github.com/dabek782/Expense-tracker-api
npm install
```

2. Create a `.env` file in the project root (see Environment variables below).

3. Start the frontend (Vite) in one terminal:

```powershell
npm run dev
```

Vite will start the frontend dev server (hot reload).

4. Start the backend in a second terminal:

```powershell
# Run backend once
node src/back/index.js

# OR run with nodemon for auto-reload during development
npx nodemon src/back/index.js
```

**Note:** Make sure you have created `src/back/.env` with your MongoDB connection string before starting the backend.

## Environment variables

Create a `.env` file in the `src/back/` directory (NOT the project root) and set the following values:

- `MONGO_DB_URI` or `MONGO_URI` — MongoDB connection string (e.g. `mongodb://localhost:27017/expenses` or your Atlas URI)
- `PORT` — port for the backend server (e.g. `5000`)
- `VITE_JWT_TOKEN` — secret for signing JSON Web Tokens (used for authentication)
- `NODE_ENV` — `development` or `production`

Example `src/back/.env`:

```
MONGO_DB_URI=mongodb://localhost:27017/expenses
PORT=5000
VITE_JWT_TOKEN=your_secret_jwt_token_here
NODE_ENV=development
```

**Important:** Do NOT use `VITE_` prefix for backend-only variables. The `VITE_` prefix is for frontend environment variables. Update your code to use `MONGO_DB_URI` and `JWT_SECRET` instead.

## Scripts (from `package.json`)

- `npm run dev` — start Vite dev server (frontend)
- `npm run build` — build frontend for production
- `npm run preview` — preview built frontend
- `npm run lint` — run ESLint on project files

Note: There is no dedicated `start` script for the backend in `package.json` by default; you can add one if you want. Example to add to `package.json`:

```json
"scripts": {
	"start:backend": "node src/back/index.js",
	"dev:backend": "npx nodemon src/back/index.js"
}
```

## Folder overview

### Frontend
- `src/main.jsx`, `src/App.jsx` — frontend entry and top-level app
- `src/components/` — React components
- `src/lib/` — utility functions

### Backend
- `src/back/index.js` — backend entry (Express app)
- `src/back/.env` — environment variables (create this file)
- `src/back/configs/db_config.js` — database configuration / connection logic
- `src/back/models/` — Mongoose models (User, Expense, etc.)
- `src/back/controllers/` — request handlers for routes
- `src/back/middleware/` — Express middleware (auth, error handling, etc.)
- `src/back/routes/` — API route definitions

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` — Register a new user
- `POST /api/v1/auth/login` — Login and get JWT token

### Expenses (requires authentication)
- `POST /api/v1/expenses` — Create new expense
- `GET /api/v1/expenses` — Get all expenses for logged-in user
- `GET /api/v1/expenses/:id` — Get single expense by ID
- `PUT /api/v1/expenses/:id` — Update expense
- `DELETE /api/v1/expenses/:id` — Delete expense

**Authentication:** Include JWT token in request header:
```
Authorization: Bearer <your_jwt_token>
```


