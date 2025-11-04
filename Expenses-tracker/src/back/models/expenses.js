import mongoose from "mongoose";

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
        enum : ["Food" , "Transport" , "Other" , "Subscriptions" , "Shopping" , "Health" , "Utilities" , "Entertainment"]
    },
    description : {
        type:String,
        trim : true
    },
    date : {
        type: Date , 
        default : Date.now
    },
    createdAt:{
        type: Date , 
        default : Date.now
    
    }
})

const Expense =  mongoose.model("Expense" , ExpenseSchema)
export default Expense