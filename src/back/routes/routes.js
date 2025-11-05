/**
 * Authentication routes
 * Handles user registration and login endpoints
 */

import express from 'express'
import { login, register } from '../controllers/authController.js'
import { validateRegister, validateLogin } from '../validators/authValidator.js'
import { asyncHandler } from '../utils/errors.js'

const router = express.Router()

// POST /api/v1/auth/register - Register a new user
// Middleware chain: validateRegister -> register
router.post('/register',validateRegister,asyncHandler(register) )

// POST /api/v1/auth/login - Login existing user
// Middleware chain: validateLogin -> login
router.post('/login',validateLogin,asyncHandler(login))

export default router