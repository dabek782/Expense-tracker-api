
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
cd "c:\Users\kubad\Desktop\programowanie\webdev\node express\expenses tracker\Expenses-tracker"
npm install
```

2. Create a `.env` file in the project root (see Environment variables below).

3. Start the frontend (Vite) in one terminal:

```powershell
npm run dev
```

Vite will start the frontend dev server (hot reload).

4. Start the backend in a second terminal. You can use `node` or `nodemon` (nodemon is installed as a dependency):

```powershell
# Run backend once
node src/back/index.js

# OR run with nodemon for auto-reload during development
npx nodemon src/back/index.js
```

Adjust the path if your backend entrypoint differs (commonly `src/back/index.js`).

## Environment variables

Create a `.env` file at the repository root and set at least the following values (names are conventional — check `src/back/configs/db_config.js` if you want exact names used by the code):

- `MONGO_URI` — MongoDB connection string (e.g. `mongodb://localhost:27017/expenses` or your Atlas URI)
- `PORT` — port for the backend server (e.g. `5000`)
- `JWT_SECRET` — secret for signing JSON Web Tokens (if auth is used)
- `NODE_ENV` — `development` or `production`

Example `.env`:

```
MONGO_URI=mongodb://localhost:27017/expenses
PORT=5000
JWT_SECRET=replace_with_a_strong_secret
NODE_ENV=development
```

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

- `src/main.jsx`, `src/App.jsx` — frontend entry and top-level app
- `src/components/` — React components
- `src/back/index.js` — backend entry (Express app)
- `src/back/configs/db_config.js` — database configuration / connection logic
- `src/back/models/` — Mongoose models
- `src/back/middleware/` — Express middleware (auth, error handling, etc.)

## Tips & troubleshooting

- If the frontend tries to access the backend and gets CORS or connection errors, check the backend `PORT` and confirm the frontend is pointing to the correct API base URL.
- If MongoDB can't connect, verify `MONGO_URI` and that your MongoDB server is running and reachable.
- Use `npx nodemon` if you want automatic restarts for backend code changes.
- If linting fails, run `npm run lint` to see the reported issues and fix them or adjust `.eslintrc` rules.

## Testing / Next steps

- Add a small `start` script for the backend to `package.json` for convenience.
- Add README sections for API endpoints if you want to document the backend routes.
- Consider Dockerizing the app and database for reproducible local setup.

---

If you'd like, I can also:
- Add `start:backend` and `dev:backend` scripts to `package.json`.
- Inspect `src/back/index.js` and `src/back/configs/db_config.js` and add a short API doc in the README listing endpoints.
- Create a `.env.example` file with recommended variable names.

