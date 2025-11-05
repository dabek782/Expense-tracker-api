import jwt from "jsonwebtoken"
import  {asyncHandler, AppError } from "../utils/errors.js"
/**
 * Authentication middleware
 * Protects routes by verifying JWT tokens in the Authorization header
 * 
 * Expected header format: "Authorization: Bearer <token>"
 * On success: Adds req.userID to the request and calls next()
 * On failure: Returns 401 Unauthorized
 */
export const authenticate = asyncHandler(async (req, res, next) => {
    // Extract token from "Bearer <token>" format
    const token = req.headers.authorization?.split(' ')[1]
    
    // Check if token exists
    if(!token){
        throw new AppError("token was not provided" , 401)
    }
        // Verify token and extract payload
        const control = jwt.verify(token, process.env.JWT_TOKEN)
        if(!control){
            throw new AppError("Token provided was wrong" , 401)
        }
        // Add user ID to request for use in controllers
        req.userID = control.id
        
        // Continue to next middleware/controller
        next()
    
})