import mongoose  from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email :{
        type:String,
        required: true,
        lowercase:true , 
        unique: true,
        maxlength: 50
    },
    password :{
        type:String,
        required: true,
        minlength : 6
    },
    createdAt:{
        type:Date,
        default:Date.now
        
    }
})

UserSchema.pre("save" , async function (next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12)
    return next() 
})

UserSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password , this.password)
    
}
const User = mongoose.model('User' , UserSchema)
export default User