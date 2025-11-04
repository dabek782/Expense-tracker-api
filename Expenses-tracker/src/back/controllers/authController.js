import mongoose  from "mongoose";
import bcrypt from "bcrypt"
import "../models/user.js"
import jwt from "jsonwebtoken"
import User from "../models/user.js";

export const register = async (req , res)=>{
    try{
    const {email , name , password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"User already in database"})
    }
    const user = await User.create({email , name , password})
    const userToken = jwt.sign({id:user._id} , process.env.JWT_TOKEN , {expiresIn:'1d'})
    return res.status(201).json({message:"User created succesfully" , user})
    }
    catch(error){
        return res.status(500).json({message:"Internal error" , error:error.message})
    }
}
export const login = async(req,res)=>{
    try {
        const {email , password} = req.body
        const ValidUser = await User.findOne({email})
        if(!ValidUser){
            return res.status(401).json({message:"Did not find user with that email"})
        }
        const isMatching = await ValidUser.isValidPassword(password)
        if(!isMatching) {
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token  = jwt.sign({id:ValidUser._id} , process.env.JWT_TOKEN , {expiresIn:'1d'})
        return res.status(200).json({message:"Login succesful"  , token})
    } catch (error) {
        return res.status(500).json({message:"Internal error" , error:error.message})
    }
}

