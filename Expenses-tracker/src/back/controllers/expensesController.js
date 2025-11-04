import mongoose from "mongoose";
import Expense from "../models/expenses.js";

export const createExpense = async (req,res)=>{
    try {
        const {name ,cost , type , description , date  }  =req.body
    const expense = await Expense.create({
        userID : req.userID,
        name,
        cost,
        type,
        description,
        date
    })
    if(expense){
       return res.status(201).json({message : "Expense succefully created" , expense})
    }

        
    } catch (error) {
      return  res.status(500).json({message:"Internal Error" ,error:error.message})
    }

}

export const getExpenses = async (req,res)=>{
    try {
        const expenses = await Expense.find({userID : req.userID}).sort({date:-1})
        return res.status(200).json({expenses})
    } catch (error) {
        return  res.status(500).json({message:"Internal Error" , error : error.message})
    }
}

export const getExpenseById = async (req,res) => {
    try {
        const expense = await Expense.findOne({
            userID : req.userID,
            _id:req.params.id
        })
        res.status(200).json({expense})
    } catch (error) {
        return  res.status(500).json({message:"Internal Error"})
    }    
}
export const deleteExpense = async(req,res)=>{
    try {
        const deleteExpense = await Expense.deleteOne({
            userID : req.userID,
            _id : req.params.id
        })
        if(deleteExpense.deletedCount === 0){
            return res.status(404).json({message:"Expense not found"})
        }
        return res.status(204).json({message:"Expense deleted"})
        
    } catch (error) {
       return  res.status(500).json({message:"Internal Error"}) 
    }
}

export  const updateExpense = async(req,res)=>{
    try {
        const {name ,cost , type , description , date  }  =req.body
        const updateExpense = await Expense.findOneAndUpdate(
           { _id : req.params.id , userID:req.userID} , 
           {name , cost , type , description , date},
           {new:true , runValidators:true}

        )
        if(!updateExpense){
            return res.status(404).json({message:"Expense not found"})
        }
          return res.status(200).json({message:"Expense updated"})

    } catch (error) {
         return  res.status(500).json({message:"Internal Error"}) 
    }
}
