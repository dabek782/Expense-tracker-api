import { createExpense , updateExpense , deleteExpense , getExpenseById , getExpenses } from '../controllers/expensesController.js'
import express from 'express'
import { authenticate } from '../middleware/middleware.js'
const router = express.Router()
router.use(authenticate)

router.get('/getAll' , getExpenses)
router.get('/getExpensesID/:id',getExpenseById)
router.post('/create',createExpense)
router.delete('/delete/:id' , deleteExpense)
router.patch('/update/:id' , updateExpense)
export default router