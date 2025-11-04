/**
 * Expense model
 * Defines the schema for tracking user expenses
 */

import mongoose from "mongoose";

// Define Expense schema with validation rules
const ExpenseSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to User model
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 20  // Brief expense name (e.g., "Groceries", "Uber")
    },
    cost: {
        type: Number,
        required: true,
        min: 0  // Prevent negative amounts
    },
    type: {
        type: String,
        required: true,
        // Only allow predefined expense categories
        enum: ["Food", "Transport", "Other", "Subscriptions", "Shopping", "Health", "Utilities", "Entertainment"]
    },
    description: {
        type: String,
        trim: true  // Remove whitespace from both ends
    },
    date: {
        type: Date,
        default: Date.now  // Defaults to current date if not provided
    },
    createdAt: {
        type: Date,
        default: Date.now  // Timestamp when expense was added to database
    }
})

const Expense = mongoose.model("Expense", ExpenseSchema)
export default Expense