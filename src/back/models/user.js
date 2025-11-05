/**
 * User model
 * Defines the schema and methods for user authentication
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt"

// Define User schema with validation rules
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,   // Minimum 3 characters
        maxlength: 30   // Maximum 30 characters
    },
    email: {
        type: String,
        required: true,
        lowercase: true,  // Convert to lowercase before saving
        unique: true,     // Ensure email is unique in database
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6  // Minimum 6 characters for security
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set creation date
    }
})

/**
 * Pre-save hook - Hash password before saving to database
 * Only runs when password is modified (new user or password change)
 */
UserSchema.pre("save", async function (next) {
    // Skip hashing if password wasn't modified
    if(!this.isModified('password')) return next()
    
    // Hash password with bcrypt (12 salt rounds)
    this.password = await bcrypt.hash(this.password, 12)
    return next() 
})

/**
 * Instance method to validate password during login
 * @param {string} password - Plain text password from login attempt
 * @returns {Promise<boolean>} - True if password matches, false otherwise
 */
UserSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)
export default User