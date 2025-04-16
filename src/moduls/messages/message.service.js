import { asyncHandler } from "../../../utilities/globalErrorHandling.js";
import messageModel from "../../DB/models/message.model.js";
import userModel from "../../DB/models/user.model.js";

//---------------------------------------------------------sendMessages---------------------------------------------------------------------------
export const sendMessages=asyncHandler(async(req,res,next)=>{
    const {content,userId}=req.body
    const user = await userModel.findOne({ _id: userId, isDeleted: false });
    if(! user){
        return next(new Error("user not found"))
    }
    const message=await messageModel.create({content,userId})
    res.status(201).json({msg:"done",message})
})
//---------------------------------------------------------getMessages---------------------------------------------------------------------------
export const getMessages=asyncHandler(async(req,res,next)=>{
    
    const message=await messageModel.find({userId:req.user._id}).populate([{
        path:"userId",
        select:" name email"
    }])
    res.status(201).json({msg:"done",message})
})
//---------------------------------------------------------deleteMessages---------------------------------------------------------------------------
export const deleteMessages=asyncHandler(async(req,res,next)=>{
    const {messageId}=req.params
    const user = await userModel.findOne({ _id:req.user._id,isDeleted: false });
    if(! user){
        return next(new Error("user not found"))
    }
    const message=await messageModel.findByIdAndDelete({_id:messageId})
    res.status(201).json({msg:"message is deleted successfuly",message})
})