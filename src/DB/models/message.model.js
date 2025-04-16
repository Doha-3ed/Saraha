import mongoose from "mongoose"


const messageSchema=new mongoose.Schema({
   content:{type:String,minLength:3,required:true,trime:true},
   userId:{type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
   }

},
{
    timestamps:true
})
const messageModel=mongoose.model.message||mongoose.model("message",messageSchema)
export default messageModel