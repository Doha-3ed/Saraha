import { asyncHandler } from "../../../utilities/globalErrorHandling.js"
import { eventEmail } from "../../../utilities/sendEmail.Event.js"
import { encrypt,
  generateToken,
  decrypt,
  compare ,
  hash,
  verifyToken
 } from "../../../utilities/security/index.js"
import messageModel from "../../DB/models/message.model.js"
import userModel from "../../DB/models/user.model.js"
//---------------------------------------------------------signUp---------------------------------------------------------------------------
export const signUp=asyncHandler(async(req,res,next)=>{
    
const {name ,email,password,phone,age,gender,role}=req.body
const existEmail=await userModel.findOne({email})
if(existEmail){
    return next(new Error("Email already exist"))
}
const phoneEncryption=await encrypt({key:phone,SECRETE_KEY:process.env.SECRETE_KEY})
const hashing=await hash({password,SALT_ROUND:process.env.SALT_ROUND})
eventEmail.emit("sendEmail",{email})

const user=await userModel.create({name ,email,password:hashing,phone:phoneEncryption,age,gender,role})
res.status(200).json({ msg: "done", user })

   
})
//---------------------------------------------------------confirmEmail---------------------------------------------------------------------------
export const confirmEmail=asyncHandler(async(req,res,next)=>{
    
  const {email,code}=req.body
  const User=await userModel.findOne({email,confirmed:false})
  if(!User){
      return next(new Error("User not found"))
  }
  const match= await compare({password:code,hashedPassword:User.otpEmail})
  if(! match){
    return next(new Error("Code not match"))
  }

  const user=await userModel.updateOne({email},{confirmed:true ,$unset:{otpEmail:0}})
  res.status(200).json({ msg: "done"})
  
     
  })
  //---------------------------------------------------------logIn---------------------------------------------------------------------------
export const logIn=asyncHandler(async(req,res,next)=>{
    
const {email,password}=req.body
const user=await userModel.findOne({email})
const checkPass=await compare({password,hashedPassword:user.password})
if(!checkPass){
 return next(new Error("password not match"))   
}
const accessToken=await generateToken(
  {payload:{ email,userId:user._id},
  SIGNATURE:user.role=="user"?process.env.PRIVATE_KEY_USER:process.env.PRIVATE_KEY_ADMAIN,
  expired:"1d"})
  const refreshToken=await generateToken(
    {payload:{ email,userId:user._id},
    SIGNATURE:user.role=="user"?process.env.PRIVATE_KEY_USER:process.env.PRIVATE_KEY_ADMAIN,
    expired:"1w"})
  
res.status(200).json({ msg: "Login Successful", token:{
  accessToken,
  refreshToken
} })
 
})
//---------------------------------------------------------refreshToken---------------------------------------------------------------------------
export const refreshToken=asyncHandler(async(req,res,next)=>{
    
  const {authorization}=req.body
  const [prefix,token]=authorization.split(" ")||[]
  let SIGNATURE=undefined
  if(!prefix||!token){
    return next(new Error("prefix or token is missing"))
  }
  if(prefix=="bearer"){
    SIGNATURE=process.env.PRIVATE_KEY_USER
  }else if(prefix=="admin"){
    SIGNATURE=process.env.PRIVATE_KEY_ADMAIN
  }else{
    return next(new Error("prefix is invalid"))
  }
  const decoded= await verifyToken({token,SIGNATURE})
  if (!decoded?.userId) {
    return next(new Error("Invalid token payload"));
}

const user = await userModel.findById(decoded.userId).lean();
if (!user) {
    return next(new Error("User does not exist"));
}
  
  const accessToken=await generateToken(
    {payload:{ email:user.email,userId:user._id},
    SIGNATURE:user.role=="user"?process.env.PRIVATE_KEY_USER:process.env.PRIVATE_KEY_ADMAIN,
    expired:"1d"})
    
  res.status(200).json({ msg: "token refreshed Successful", token:{
    accessToken
  } })
   
  })
  //---------------------------------------------------------forgetPassword---------------------------------------------------------------------------
  export const forgetPassword=asyncHandler(async(req,res,next)=>{
    
    const {email}=req.body
    const User=await userModel.findOne({email,isDeleted:false})
    if(!User){
        return next(new Error("User not found"))
    }
    eventEmail.emit("forgetPassword",{email})
    
    res.status(200).json({ msg: "done"})
    
       
    })
    //---------------------------------------------------------resetPassword---------------------------------------------------------------------------
    export const resetPassword=asyncHandler(async(req,res,next)=>{
    
      const {email,code ,newPassword}=req.body
      const User=await userModel.findOne({email,isDeleted:false})
      if(!User){
          return next(new Error("User not found"))
      }
     const match= await compare({password:code,hashedPassword:User.otpPassword})
      if(!match){
        return next(new Error("invald code"))
      }
      const Hash= await hash({password:newPassword,SALT_ROUND:process.env.SALT_ROUND})
      const nUser=await userModel.updateOne({email},{password:Hash,confirmed:true,$unset:{otpPassword:0}})
      res.status(200).json({ msg: "done",nUser})
      
         
      })
//---------------------------------------------------------getPorfile---------------------------------------------------------------------------

export const getPorfile=asyncHandler(async(req,res,next)=>{
  req.user.phone=await decrypt({key:req.user.phone,SECRETE_KEY:process.env.SECRETE_KEY})
 
  const message=await messageModel.find({userId:req.user._id})
    res.status(201).json({msg:"done",user:req.user,message})
})
//---------------------------------------------------------updatePassword---------------------------------------------------------------------------
export const updatePassword=asyncHandler(async(req,res,next)=>{
    const{oldPass,newPass}=req.body
   
    const isMatch=  await compare({password:oldPass,hashedPassword:req.user.password})
    if(!isMatch){
        return next(new Error("invalid password"))
    }
    const hashed= await hash({password:newPass},+process.env.SALT_ROUND)
  
    const user = await userModel.findByIdAndUpdate(
      req.user._id, 
      { password: hashed, passwordChangedAt: Math.floor(Date.now() / 1000) }, 
      { new: true, lean: true })
   
    res.status(201).json({msg:"done",user})
})
//---------------------------------------------------------updatePorfile---------------------------------------------------------------------------
export const updatePorfile=asyncHandler(async(req,res,next)=>{
  if (req.body.phone) {
    req.body.phone = await encrypt({ 
        key: req.body.phone, 
        SECRETE_KEY: process.env.SECRETE_KEY 
    });
}

const user = await userModel.findByIdAndUpdate(
  req.user._id, 
  req.body,
   { new: true, lean: true });

if (!user) {
    return next(new Error("User not found"));
}

      res.status(201).json({msg:"done",user})
  })
//---------------------------------------------------------softDelete---------------------------------------------------------------------------
  export const softDelete=asyncHandler(async(req,res,next)=>{
    
    const user=await userModel.findByIdAndUpdate(req.user._id,{isDeleted:true})
     
      res.status(201).json({msg:"done",user})
  })
  //---------------------------------------------------------shareProfile---------------------------------------------------------------------------
  export const shareProfile=asyncHandler(async(req,res,next)=>{
    
    const user=await userModel.findById(req.params.id)
    if(!user){
      return next(new Error("user not found"))
    }
     
      res.status(201).json({msg:"done",user})
  })