import { globalError } from "../utilities/globalErrorHandling.js"
import connectionDb from "./DB/connectionDB.js"
import messageRouter from "./moduls/messages/messsage.controller.js"
import userRouter from "./moduls/users/user.controller.js"
import helmet from "helmet";
import cors from "cors";
import { generalLimiter } from "./middleWare/rateLimit.js";
 
export const bootstrape=async(app,express)=>{
    app.use(cors());
    app.use(helmet());
    app.use(express.json())
      app.use(generalLimiter);
    app.use("/users",userRouter)
    app.use("/messages",messageRouter)
   connectionDb()
   app.use('*',(req,res,next)=>{
   return next(new Error("invalid URL"))
   })
app.use(globalError)
}