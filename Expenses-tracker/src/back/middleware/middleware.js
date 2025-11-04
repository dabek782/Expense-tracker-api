import jwt from "jsonwebtoken"

/**
 * Authentication middleware
 * Protects routes by verifying JWT tokens in the Authorization header
 * 
 * Expected header format: "Authorization: Bearer <token>"
 * On success: Adds req.userID to the request and calls next()
 * On failure: Returns 401 Unauthorized
 */
export const authenticate = async (req, res, next) => {
    // Extract token from "Bearer <token>" format
    const token = req.headers.authorization?.split(' ')[1]
    
    // Check if token exists
    if(!token){
        return res.status(401).json({message: "No token provided"})
    }
    
    try {
        // Verify token and extract payload
        const control = jwt.verify(token, process.env.JWT_TOKEN)
        
        // Add user ID to request for use in controllers
        req.userID = control.id
        
        // Continue to next middleware/controller
        next()
    } catch (error) {
        // Token is invalid or expired
        return res.status(401).json({message: "Invalid or expired token"})
    }
}