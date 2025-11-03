import dotevn from "dotenv"
import jwt from "jsonwebtoken"
dotevn.config({path:"../env"})

export const authenticate = async (req,res,next) => {
    const token  = req.headers.authtorization?.split('')[1]
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }
    const control = jwt.verify(token , process.env.JWT_TOKEN)
    req.userID = control.id
    next()
    if(!control){
        return res.status(401).json({message:"Invalid or expired token"})
    }
}