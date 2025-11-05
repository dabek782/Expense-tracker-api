/**
 * Expense routes
 * Handles CRUD operations for user expenses
 * All routes require authentication
 */

import { createExpense, updateExpense, deleteExpense, getExpenseById, getExpenses } from '../controllers/expensesController.js'
import express from 'express'
import { authenticate } from '../middleware/middleware.js'
import { asyncHandler } from '../utils/errors.js'

const router = express.Router()

// Apply authentication middleware to all routes below
// All expense operations require a valid JWT token
router.use(authenticate)

// GET /api/v1/expense/getAll - Retrieve all expenses for logged-in user
router.get('/getAll',asyncHandler(getExpenses) )

// GET /api/v1/expense/getExpensesID/:id - Get single expense by ID
router.get('/getExpensesID/:id',asyncHandler(getExpenseById) )

// POST /api/v1/expense/create - Create new expense
router.post('/create',asyncHandler(createExpense) )

// DELETE /api/v1/expense/delete/:id - Delete expense by ID
router.delete('/delete/:id', asyncHandler(deleteExpense) )

// PATCH /api/v1/expense/update/:id - Update expense by ID
router.patch('/update/:id', asyncHandler(updateExpense) )

export default router