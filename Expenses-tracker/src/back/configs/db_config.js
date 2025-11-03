import mongoose from 'mongoose'
const connectDB = async (uri) =>{
    try {
        await mongoose.connect(uri)
        console.log("connected")
    } catch (error) {
        console.error(error)
    }
} 
export default connectDB