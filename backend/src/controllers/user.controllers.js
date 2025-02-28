import { asyncWrapper,apiResponse,apiError,uploadOnCloudinary } from "../utils/utilsDirectory.js";


const registerUser = asyncWrapper( async(req,res)=>{
   res.status(200).json({
    message:"Testing chale chhu"
   })
})

export {registerUser}