import { Router } from "express";
import { login, registerUser ,logout} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const userRouter= Router();

userRouter.route("/register-user").post(upload.single("avatar"),registerUser)

userRouter.route("/login").post(login)
userRouter.route("/logout").get(verifyUser,logout)







export default userRouter ;
