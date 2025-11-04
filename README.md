
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
- `src/components/` — React components (Radix UI based)
- `src/lib/` — utility functions
- `vite.config.js` — Vite configuration with React plugin and path aliases

### Backend
- `src/back/index.js` — backend entry (Express app)
- `src/back/.env` — environment variables (create this file)
- `src/back/configs/db_config.js` — database configuration / connection logic
- `src/back/models/` — Mongoose models (User, Expense)
- `src/back/controllers/` — request handlers for routes (authController, expensesController)
- `src/back/middleware/` — Express middleware (JWT authentication)
- `src/back/validators/` — Joi validation schemas and middleware (authValidator)
- `src/back/routes/` — API route definitions (routes.js for auth, expensesRoutes.js)

## API Endpoints

### Authentication (No token required)
- `POST /api/v1/auth/register` — Register a new user
  - Body: `{ "email": "user@example.com", "name": "John Doe", "password": "password123" }`
  - Validation: Email must be valid format (max 30 chars), name 3-30 chars, password 6-50 chars
  - Response: `201 Created` with user ID or `400 Bad Request` with validation errors

- `POST /api/v1/auth/login` — Login and get JWT token
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Validation: Email must be valid format, password required
  - Response: `200 OK` with JWT token or `401 Unauthorized` / `404 Not Found`

### Expenses (Requires authentication)
All expense endpoints require a valid JWT token in the Authorization header.

- `POST /api/v1/expense/create` — Create new expense
  - Body: `{ "name": "Groceries", "cost": 50.00, "type": "Food", "description": "Weekly shopping", "date": "2025-11-04" }`
  - Response: `201 Created` with expense object

- `GET /api/v1/expense/getAll` — Get all expenses for logged-in user
  - Response: `200 OK` with array of expenses

- `GET /api/v1/expense/getExpensesID/:id` — Get single expense by ID
  - Response: `200 OK` with expense object or `404 Not Found`

- `PATCH /api/v1/expense/update/:id` — Update expense
  - Body: Fields to update (e.g., `{ "cost": 75.00, "description": "Updated" }`)
  - Response: `200 OK` with updated expense

- `DELETE /api/v1/expense/delete/:id` — Delete expense
  - Response: `204 No Content` or `404 Not Found`

**Authentication:** Include JWT token in request header:
```
Authorization: Bearer <your_jwt_token>
```

## Data Validation

The backend uses **Joi** for request validation. All validation errors return `400 Bad Request` with a JSON object containing detailed error information:

```json
{
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    },
    {
      "field": "password",
      "message": "\"password\" length must be at least 6 characters long"
    }
  ]
}
```

### Validation Rules

**Registration:**
- Email: Valid email format, max 30 characters
- Name: 3-30 characters
- Password: 6-50 characters

**Login:**
- Email: Valid email format (no length restriction for existing users)
- Password: Required (no length restriction - validated against stored hash)

**Expenses:**
- Name: 2-20 characters (required)
- Cost: Number >= 0 (required)
- Type: Must be one of: `Food`, `Transport`, `Utilities`, `Entertainment`, `Shopping`, `Health`, `Other`, `Subscriptions`
- Description: Optional
- Date: Valid date (optional, defaults to current date)



