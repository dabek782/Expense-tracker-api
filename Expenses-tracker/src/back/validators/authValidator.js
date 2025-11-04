import Joi from "joi";

const signUp = Joi.object({
  email:Joi.string().email().required().max(30),
  name:Joi.string().min(3).max(30).required(),  
  password:Joi.string().min(6).max(50).required()
})
const login = Joi.object({
    email:Joi.string().email().required(),  
    password:Joi.string().required()
})

export const validateRegister = (req,res,next) =>{
    const data = req.body
    const {error , value} = signUp.validate(data)
    if(error){
        return res.status(400).json({
            errors : error.details.map(err=>({
                field : err.path[0],
                message : err.message
            }
        )
            )
        })
    }
    next()
}
export const validateLogin = (req,res,next) =>{
    const data  = req.body
    const {error , value} = login.validate(data)
    if(error){
        return res.status(400).json({
            errors:error.details.map(err=>({
                field:err.path[0],
                message:err.message
            })
        )
        })
    }
    next()
}