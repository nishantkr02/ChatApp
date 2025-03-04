import { asyncWrapper ,apiError,apiResponse} from "../utils/utilsDirectory.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyUser = asyncWrapper(async (req,res,next)=>{
const token = req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer","")

if(!token)
    throw new apiError(401,"Unauthorized request !! : You are not Logged In  ")


const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

if(!decodedToken )
    throw new apiError(401,"Unauthorized request !! :: Invalid Access Token ,Verification Failed ")

const loggedInUser = await User.findById(decodedToken?._id).select("-password -refreshToken")
 if(!loggedInUser)
    throw new apiError(404,"No User Found : Invalid Tokens !!")

 req.user = loggedInUser ;
 next();


})

export {verifyUser}