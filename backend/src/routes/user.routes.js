import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter= Router();

userRouter.route("/register-user").post(upload.single("avatar"),registerUser)









export default userRouter ;
