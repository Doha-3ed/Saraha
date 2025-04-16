import bcrypt from "bcrypt"

export const hash=async({password,SALT_ROUND=process.env.SALT_ROUND})=>{
    return  bcrypt.hash(password,Number(SALT_ROUND))
}