/**
 * Main Express application entry point
 * Sets up middleware, routes, and starts the server
 */

import express from 'express'
import 'dotenv/config'  // Load environment variables from .env file
import connectDB from './configs/db_config.js'
import cors from 'cors'
import auth from './routes/routes.js'
import expense from './routes/expensesRoutes.js'

const app = express()

// Middleware setup
app.use(express.json())  // Parse JSON request bodies
app.use(cors())          // Enable CORS for all routes

// Connect to MongoDB database
connectDB(process.env.MONGO_DB_URI)

// Root endpoint - simple health check
app.get('/', (req, res) => {
    res.send("Hello")
})

// Mount API routes
app.use('/api/v1/auth', auth)        // Authentication routes (register, login)
app.use('/api/v1/expense', expense)  // Expense routes (CRUD operations)

// Start the server
app.listen(process.env.PORT, (req, res) => {
    console.log("server started")
})
