import { Router } from "express";
import { getMessagesBetweenUsers,getAllChats,sendMessage } from "../controllers/message.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import userRouter from "./user.routes.js";


const messageRouter= Router();
messageRouter.route("/all-chats").get(verifyUser,getAllChats)
messageRouter.route("/conversation/:id").get(verifyUser,getMessagesBetweenUsers)
userRouter.route("/send-message/:id").post(verifyUser   ,sendMessage)

export default messageRouter