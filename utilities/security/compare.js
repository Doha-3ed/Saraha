
import bcrypt from "bcrypt"
export const compare=async({password,hashedPassword})=>{
    return  bcrypt.compare(password, hashedPassword)

}