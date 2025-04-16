import  Router  from "express";
import { validation } from "../../middleWare/Validation.js";
import * as UV from "./uservalidation.js";
import * as US from "./user.service.js";
import { authenticated } from "../../middleWare/Authentication.js";
import { asyncHandler } from "../../../utilities/globalErrorHandling.js";
const userRouter=Router()

userRouter.post("/signUp",validation(UV.signUpSchema),asyncHandler(US.signUp))
userRouter.patch("/confirmEmail",validation(UV.confirmSchema),US.confirmEmail)
userRouter.post("/login",validation(UV.loginSchema),US.logIn)
userRouter.get("/refreshToken",validation(UV.refreshTokeSchema),US.refreshToken)
userRouter.patch("/forgetPassword",validation(UV.forgetPasswordSchema),US.forgetPassword)
userRouter.patch("/resetPassword",validation(UV.resetPasswordSchema),US.resetPassword)

userRouter.get("/getProfile",authenticated,US.getPorfile)
userRouter.get("/shareProfile/:id",validation(UV.shareProfileSchema),authenticated,US.shareProfile)
userRouter.patch("/updateProfile",validation(UV.updateSchema),authenticated,US.updatePorfile)
userRouter.patch("/updatePassword",validation(UV.updatePasswordSchema),authenticated,US.updatePassword)

userRouter.delete("/freezeAccount",validation(UV.softDeleteSchema),authenticated,US.softDelete)

export default userRouter