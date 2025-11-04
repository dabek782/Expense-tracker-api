import Joi from "joi";

// Schema for user registration validation
// Enforces strong data quality for new accounts
const signUp = Joi.object({
  email: Joi.string().email().required().max(30),      // Valid email format, max 30 chars
  name: Joi.string().min(3).max(30).required(),        // Name between 3-30 characters
  password: Joi.string().min(6).max(50).required()     // Password between 6-50 characters
})

// Schema for login validation
// Less strict - only checks if fields exist and email format is valid
// Does not enforce password length (users with old accounts must be able to login)
const login = Joi.object({
    email: Joi.string().email().required(),     // Valid email format
    password: Joi.string().required()           // Any password length (validated against hash in controller)
})

// Middleware to validate registration data
// Runs before the register controller to catch bad data early
export const validateRegister = (req, res, next) => {
    const data = req.body
    const {error, value} = signUp.validate(data)
    
    // If validation fails, return 400 with detailed error messages
    if(error){
        return res.status(400).json({
            errors: error.details.map(err => ({
                field: err.path[0],        // Field name (e.g., "email", "password")
                message: err.message       // Error description (e.g., "email must be a valid email")
            }))
        })
    }
    
    // If validation passes, continue to the register controller
    next()
}

// Middleware to validate login data
// Runs before the login controller
export const validateLogin = (req, res, next) => {
    const data = req.body
    const {error, value} = login.validate(data)
    
    // If validation fails, return 400 with detailed error messages
    if(error){
        return res.status(400).json({
            errors: error.details.map(err => ({
                field: err.path[0],        // Field name
                message: err.message       // Error description
            }))
        })
    }
    
    // If validation passes, continue to the login controller
    next()
}