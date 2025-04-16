import Joi from "joi"
import { generalRules } from "../../../utilities/globalRules.js"


export const sendMessageSchema ={ 
    body:Joi.object({
    content:Joi.string()
            
            .min(3)
            
            .required(),
    userId:generalRules.id.required()
   
})}
export const deleteMessageSchema ={ 
    params:Joi.object({
    
        messageId:generalRules.id.required()
   
}),
headers:generalRules.headers.required()
}
