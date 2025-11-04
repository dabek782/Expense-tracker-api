/**
 * Database configuration and connection
 * Handles MongoDB connection using Mongoose
 */

import mongoose from 'mongoose'

/**
 * Connect to MongoDB database
 * @param {string} uri - MongoDB connection string (from environment variables)
 */
const connectDB = async (uri) => {
    try {
        // Establish connection to MongoDB
        await mongoose.connect(uri)
        console.log("connected")
    } catch (error) {
        // Log connection errors
        console.error(error)
    }
} 

export default connectDB