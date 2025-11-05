/**
 * Authentication controller
 * Handles user registration and login logic
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt"
import "../models/user.js"
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import { AppError , asyncHandler} from "../utils/errors.js";

/**
 * Register a new user
 * Creates a new user account with hashed password
 * 
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const register =asyncHandler( async (req, res) => {

        const {email, name, password} = req.body
        
        // Check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new AppError("User with this email already exits in database" , 401)
        }
        
        // Create new user (password will be hashed by pre-save hook)
        const user = await User.create({email, name, password})
        
        // Generate JWT token for immediate login
        const userToken = jwt.sign({id: user._id}, process.env.JWT_TOKEN, {expiresIn: '1d'})
        
        return res.status(201).json({message: "User created succesfully", user})
})
    


/**
 * Login existing user
 * Validates credentials and returns JWT token
 * 
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = asyncHandler( async(req, res) => {

        const {email, password} = req.body
        
        // Find user by email
        const ValidUser = await User.findOne({email})
        if(!ValidUser){
            throw new AppError("This email does not belong to any user" , 401)
        }
        
        // Verify password using bcrypt comparison
        const isMatching = await ValidUser.isValidPassword(password)
        if(!isMatching) {
            throw new AppError("Password or email  does not match" , 401)
        }
        
        // Generate JWT token for authenticated session
        const token = jwt.sign({id: ValidUser._id}, process.env.JWT_TOKEN, {expiresIn: '1d'})
        
        return res.status(200).json({message: "Login succesful", token})
      
})

