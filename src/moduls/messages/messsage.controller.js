import { Router } from "express";
import { validation } from "../../middleWare/Validation.js";
import { deleteMessageSchema, sendMessageSchema } from "./messageValidation.js";
import { deleteMessages, getMessages, sendMessages } from "./message.service.js";
import { authenticated } from "../../middleWare/Authentication.js";

const messageRouter=Router()
messageRouter.post('/',validation(sendMessageSchema),sendMessages)
messageRouter.get('/',authenticated,getMessages)
messageRouter.delete('/deletMessage/:messageId',validation(deleteMessageSchema),authenticated,deleteMessages)







export default messageRouter