import mongoose  from "mongoose"

 const connectionDb=async()=>{
   mongoose.connect(process.env.URI_CONNECTION).then(()=>{
    console.log("connected to DB successfully")
 }).catch((error)=>{
    console.log({msg:"error in DBConnection",error})
 })}

export default connectionDb