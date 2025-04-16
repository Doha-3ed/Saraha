
import { EventEmitter } from "events";
import { sendEmail } from "../src/moduls/users/service/sendEmails.js";
import {nanoid,customAlphabet} from "nanoid"
import { hash } from "./security/hash.js";
import userModel from "../src/DB/models/user.model.js";
import { html } from "../src/moduls/users/service/html.js";
export const eventEmail=new EventEmitter()
eventEmail.on("sendEmail",async(data)=>{
    const {email}=data
    const otp=customAlphabet("0123456789",4)()
    const hashing= await hash({password:otp,SALT_ROUND:process.env.SALT_ROUND})
    await userModel.updateOne({email},{otpEmail:hashing})
    
    await sendEmail(email,"Confirm me",html({otp,type:"Confirm Email"}))
})
eventEmail.on("forgetPassword",async(data)=>{
    const {email}=data
    const otp=customAlphabet("0123456789",4)()
    const hashing= await hash({password:otp,SALT_ROUND:process.env.SALT_ROUND})
    await userModel.updateOne({email},{otpPassword:hashing})
    
    await sendEmail(email,"Forget Password",html({otp,type:"Forget Password"}))
})