import mongoose from "mongoose";
import dotenv from "dotenv"
import { Type } from "lucide-react";
import { Description } from "@radix-ui/themes/dist/cjs/components/alert-dialog";

const ExpenseSchema = new mongoose.Schema({
    userID :{
       type : mongoose.Schema.Types.ObjectId ,
       required: true
    },
    name :{
        type:String,
        required :true,
        maxlength : 20
    },
    cost :{
        type : Number,
        required : true,
        min: 0

    },
    type : {
        type:String,
        required : true,
        enum : ["food" , "transport" , "other" , "subscriptions" , "shopping" , "healthcare" , "utilities" , "entertainment"]
    },
    description : {
        type:String,
        trim : true
    },
    date : {
        type: Date , 
        default : Date.now()
    },
    createdAt:{
        type: Date , 
        default : Date.now()
    
    }
})

const Expense =  mongoose.model("Expense " , ExpenseSchema)
export default Expense