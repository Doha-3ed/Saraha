import jwt from "jsonwebtoken"

export const generateToken=async({payload={},SIGNATURE})=>{
    return jwt.sign(payload,SIGNATURE)
}