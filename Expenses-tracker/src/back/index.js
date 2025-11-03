import express from 'express'
import 'dotenv/config'
import  connectDB from'./configs/db_config.js'
import cors from 'cors'
import auth from './routes/routes.js'
import expense from './routes/routes.js'
const app = express()
app.use(express.json())
app.use(cors())

connectDB(process.env.MONGO_DB_URI)
app.get('/' , (req,res)=>{
    res.send("Hello")
})
app.use('/api/v1/auth' , auth)
app.use('/api/v1/expense' , expense)
app.listen(process.env.PORT , (req,res)=>{
    console.log("server started")
})
