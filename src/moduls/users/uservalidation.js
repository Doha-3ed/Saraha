import Joi from "joi"
import { generalRules } from "../../../utilities/globalRules.js"


//------------------------------------------------------------signUpSchema------------------------------------------------------------
export const signUpSchema =
    Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: generalRules.password.required(),
    repeat_password: Joi.valid(Joi.ref('password')),
    phone: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/) // Regex for phone numbers
    .required(),

    age: Joi.number()
        .integer()
        .min(15)
        .max(60),

    email:generalRules.email.required() ,
    gender: Joi.string().valid("male","female").required(),
    role:Joi.string().valid("user","admain").required()
})
    
 
    .with('password', 'repeat_password')

//------------------------------------------------------------confirmSchema------------------------------------------------------------
export const confirmSchema = 
   Joi.object({
    
    email:generalRules.email.required() ,
    code:Joi.string().length(4).required()
   
})
//------------------------------------------------------------loginSchema------------------------------------------------------------
export const loginSchema = 
   Joi.object({
    
    email:generalRules.email.required() ,
    password:generalRules.password.required()
   
})
//------------------------------------------------------------refreshTokenSchema------------------------------------------------------------
export const refreshTokeSchema = 
   Joi.object({
    
    authorization:Joi.string().required()
   
})
//------------------------------------------------------------forgetPasswordSchema------------------------------------------------------------
export const forgetPasswordSchema = 
   Joi.object({
    
    email:generalRules.email.required()
})
//------------------------------------------------------------resetPasswordSchema------------------------------------------------------------
export const resetPasswordSchema = 
Joi.object({
 
 email:generalRules.email.required(),
 code:Joi.string().required(),
 newPassword:generalRules.password.required(),
 cPassword:generalRules.password.valid(Joi.ref('newPassword'))
   
})
//------------------------------------------------------------updateSchema------------------------------------------------------------
    
 


export const updateSchema ={ 
    body:Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        ,

   
    phone: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/) // Regex for phone numbers
    ,

    age: Joi.number()
        .integer()
        .min(15)
        .max(60),

   
    gender: Joi.string().valid("male","female"),
   
})
    ,
    headers:generalRules.headers.required()

}
//------------------------------------------------------------updatePasswordSchema------------------------------------------------------------
export const updatePasswordSchema ={ 
    body:Joi.object({
        oldPass:generalRules.password.required(),
        newPass:generalRules.password.required(),
        cpassword: generalRules.password.valid(Joi.ref('newPass')).required()
   
})
    ,
    headers:generalRules.headers.required()

}
//------------------------------------------------------------softDeleteSchema------------------------------------------------------------
export const softDeleteSchema ={ 
   
    headers:generalRules.headers.required()

}
//------------------------------------------------------------shareProfileSchema------------------------------------------------------------
export const shareProfileSchema ={ 
    params:Joi.object({
        id:generalRules.id.required(),
       
   
})
   

}