

import mongoose from "mongoose"
import { role } from "../../middleWare/Authentication.js"


export const gender={
    male:"male",
    female:"female"
}
const userSchema=new mongoose.Schema({
    name:{ type: String,required: true,minLength:3,maxLength:30, trime:true},
    email:{type: String,required: true},
    password:{type: String,required: true},
    age:{type:Number,required:true},
    gender:{type:String,
        enum: Object.values(gender)},

    phone:{type:String,required:true},
    confirmed:{type:Boolean,
        default:false

    },
    role:{type:String,
        enum:Object.values(role),
        default:role.user
    },
    
        passwordChangedAt:{
            type:Date
        },
    isDeleted:{
        type:Boolean,
        default:false
    },
    otpEmail:String,
    otpPassword:String
    

},
{
    timestamps:true
})
 const userModel=mongoose.model.user||mongoose.model("user",userSchema)
 export default userModel