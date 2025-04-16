import jwt from "jsonwebtoken";
import userModel from "../DB/models/user.model.js";

export const role={
    user:"user",
    admin:"admin"
}
export const authenticated = async (req, res, next) => {
  
        
        const { authorization } = req.headers;

        if (!authorization) {
            return next(new Error("Authorization header is missing"));
        }

        const [prefix, token] = authorization.split(" ") || [];
        if (!prefix || !token) {
            return next(new Error("Token or prefix is required in the authorization header"));
        }

        
        let SIGNATURE_TOKEN;
        if (prefix.toLowerCase() === "bearer") {
            SIGNATURE_TOKEN = process.env.PRIVATE_KEY_ADMIN; 
        } else {
            SIGNATURE_TOKEN = process.env.PRIVATE_KEY_USER; 

        if (!SIGNATURE_TOKEN) {
            return next(new Error("Server configuration error: Signature key is missing"));
        }

       
        const decoded = jwt.verify(token, SIGNATURE_TOKEN);
       

        if (!decoded?.userId) {
            return next(new Error("Invalid token payload"));
        }

        const user = await userModel.findById(decoded.userId).lean();
        if (!user) {
            return next(new Error("User does not exist"));
        }
        if (user?.passwordChangedAt?.getTime() / 1000 > decoded.iat) {
            return next(new Error("Invalid token. Please login again"));
        }
        if(user?.isDeleted){
            return next(new Error("user is deleted"));
        }

        
        req.user = user;
        next();
    
}
}
export const authorization=(accessRole=[])=>{
return(req,res,next)=>{
if(!accessRole.includes(req.user.role)){
    return next(new Error("access denied"))
}
next()
}
}