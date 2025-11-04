/**
 * Expense controller
 * Handles all CRUD operations for user expenses
 * All functions require authentication - req.userID is set by authenticate middleware
 */

import mongoose from "mongoose";
import Expense from "../models/expenses.js";

/**
 * Create a new expense
 * 
 * @route POST /api/v1/expense/create
 * @access Private (requires JWT token)
 */
export const createExpense = async (req, res) => {
    try {
        const {name, cost, type, description, date} = req.body
        
        // Create expense linked to authenticated user
        const expense = await Expense.create({
            userID: req.userID,  // Set from JWT token in authenticate middleware
            name,
            cost,
            type,
            description,
            date
        })
        
        if(expense){
            return res.status(201).json({message: "Expense succefully created", expense})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Error", error: error.message})
    }
}

/**
 * Get all expenses for the logged-in user
 * Returns expenses sorted by date (newest first)
 * 
 * @route GET /api/v1/expense/getAll
 * @access Private (requires JWT token)
 */
export const getExpenses = async (req, res) => {
    try {
        // Find only expenses belonging to the authenticated user
        const expenses = await Expense.find({userID: req.userID}).sort({date: -1})
        return res.status(200).json({expenses})
    } catch (error) {
        return res.status(500).json({message: "Internal Error", error: error.message})
    }
}

/**
 * Get a single expense by ID
 * Ensures user can only access their own expenses
 * 
 * @route GET /api/v1/expense/getExpensesID/:id
 * @access Private (requires JWT token)
 */
export const getExpenseById = async (req, res) => {
    try {
        // Find expense that belongs to user AND matches the ID
        const expense = await Expense.findOne({
            userID: req.userID,
            _id: req.params.id
        })
        res.status(200).json({expense})
    } catch (error) {
        return res.status(500).json({message: "Internal Error"})
    }    
}

/**
 * Delete an expense by ID
 * Users can only delete their own expenses
 * 
 * @route DELETE /api/v1/expense/delete/:id
 * @access Private (requires JWT token)
 */
export const deleteExpense = async(req, res) => {
    try {
        // Delete only if expense belongs to authenticated user
        const deleteExpense = await Expense.deleteOne({
            userID: req.userID,
            _id: req.params.id
        })
        
        // Check if any document was deleted
        if(deleteExpense.deletedCount === 0){
            return res.status(404).json({message: "Expense not found"})
        }
        return res.status(204).json({message: "Expense deleted"})
    } catch (error) {
        return res.status(500).json({message: "Internal Error"}) 
    }
}

/**
 * Update an expense by ID
 * Users can only update their own expenses
 * 
 * @route PATCH /api/v1/expense/update/:id
 * @access Private (requires JWT token)
 */
export const updateExpense = async(req, res) => {
    try {
        const {name, cost, type, description, date} = req.body
        
        // Update only if expense belongs to authenticated user
        const updateExpense = await Expense.findOneAndUpdate(
            {_id: req.params.id, userID: req.userID}, 
            {name, cost, type, description, date},
            {new: true, runValidators: true}  // Return updated doc and validate data
        )
        
        if(!updateExpense){
            return res.status(404).json({message: "Expense not found"})
        }
        return res.status(200).json({message: "Expense updated"})
    } catch (error) {
        return res.status(500).json({message: "Internal Error"}) 
    }
}
