/**
 * Authentication controller
 * Handles user registration and login logic
 */

import mongoose from "mongoose";
import bcrypt from "bcrypt"
import "../models/user.js"
import jwt from "jsonwebtoken"
import User from "../models/user.js";

/**
 * Register a new user
 * Creates a new user account with hashed password
 * 
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const register = async (req, res) => {
    try {
        const {email, name, password} = req.body
        
        // Check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already in database"})
        }
        
        // Create new user (password will be hashed by pre-save hook)
        const user = await User.create({email, name, password})
        
        // Generate JWT token for immediate login
        const userToken = jwt.sign({id: user._id}, process.env.JWT_TOKEN, {expiresIn: '1d'})
        
        return res.status(201).json({message: "User created succesfully", user})
    }
    catch(error){
        return res.status(500).json({message: "Internal error", error: error.message})
    }
}

/**
 * Login existing user
 * Validates credentials and returns JWT token
 * 
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        
        // Find user by email
        const ValidUser = await User.findOne({email})
        if(!ValidUser){
            return res.status(401).json({message: "Did not find user with that email"})
        }
        
        // Verify password using bcrypt comparison
        const isMatching = await ValidUser.isValidPassword(password)
        if(!isMatching) {
            return res.status(401).json({message: "Invalid credentials"})
        }
        
        // Generate JWT token for authenticated session
        const token = jwt.sign({id: ValidUser._id}, process.env.JWT_TOKEN, {expiresIn: '1d'})
        
        return res.status(200).json({message: "Login succesful", token})
    } catch (error) {
        return res.status(500).json({message: "Internal error", error: error.message})
    }
}

