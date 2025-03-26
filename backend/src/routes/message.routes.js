import { Router } from "express";
import { getMessagesBetweenUsers,getAllChats,sendMessage } from "../controllers/message.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";



const messageRouter= Router();
messageRouter.route("/all-chats").get(verifyUser,getAllChats)
messageRouter.route("/conversation/:id").get(verifyUser,getMessagesBetweenUsers)
messageRouter.route("/send-message/:id").post(verifyUser,upload.single("media")   ,sendMessage)

export default messageRouter