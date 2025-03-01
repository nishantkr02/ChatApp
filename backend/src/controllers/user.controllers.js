import { asyncWrapper,apiResponse,apiError,uploadOnCloudinary } from "../utils/utilsDirectory.js";
import { User } from "../models/user.model.js";




const registerUser = asyncWrapper( async(req,res)=>{
  
//step 1: Get data from the frontend(user) :
const {name,email,password}= req.body
console.log("Entered Data :" ,{name,email,password})


//Step 2 : verify whether all data is provided or not
if([name,email,password].some((feild)=>feild?.trim()==="")){
 throw new apiError(400,"All feilds are required !!Check if you've entered name ,email and passord feilds correctly . ")
}


//Step 3 : Check if user already exists 
const existingUser = await User.findOne({email:email})
if(existingUser)
   throw new apiError(400,"User with this Email already Exist ,Kindly user Different Email")



//step 4 :Check if all media files are provided or not ,although it is not required feild
const avatarLocalPath = req.file?.path
//console.log("File from the multer ",avtarLocalPath);
if(!avatarLocalPath){
   throw new apiError(400,"Kindly provide the Avatar file ! Avatar is required !!")
}


//step 5 : Upload them to cloudinary ,get the url for the image from clodinary response
const avatar = await uploadOnCloudinary(avatarLocalPath)
if(!avatar){
   throw new apiError(400,"Failed to upload on Cloudinary !!")
}


//Step 6: finally create the new user object and save that to db 
const newUser = await User.create({
   name:name,
   email:email,
   password :password,
   avatar:avatar?.url
})



//Step 7 : check if user created or not remove sensitive info from the user creation response 
const createdUser = await User.findById(newUser._id).select("-password -refreshToken")

if(!createdUser)
   throw new apiError(500,"Cannot register the user in the DB !!")


//Step 8: send the response
res.status(201).json(new apiResponse(201,createdUser,"User registered Successfully .!!"))


})

export {registerUser}