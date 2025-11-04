/**
 * Expense routes
 * Handles CRUD operations for user expenses
 * All routes require authentication
 */

import { createExpense, updateExpense, deleteExpense, getExpenseById, getExpenses } from '../controllers/expensesController.js'
import express from 'express'
import { authenticate } from '../middleware/middleware.js'

const router = express.Router()

// Apply authentication middleware to all routes below
// All expense operations require a valid JWT token
router.use(authenticate)

// GET /api/v1/expense/getAll - Retrieve all expenses for logged-in user
router.get('/getAll', getExpenses)

// GET /api/v1/expense/getExpensesID/:id - Get single expense by ID
router.get('/getExpensesID/:id', getExpenseById)

// POST /api/v1/expense/create - Create new expense
router.post('/create', createExpense)

// DELETE /api/v1/expense/delete/:id - Delete expense by ID
router.delete('/delete/:id', deleteExpense)

// PATCH /api/v1/expense/update/:id - Update expense by ID
router.patch('/update/:id', updateExpense)

export default router