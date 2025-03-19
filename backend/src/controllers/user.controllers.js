import { asyncWrapper,apiResponse,apiError,uploadOnCloudinary } from "../utils/utilsDirectory.js";
import { User } from "../models/user.model.js";




const registerUser = asyncWrapper( async(req,res)=>{
  
//step 1: Get data from the frontend(user) :
const {name,email,password}= req.body
console.log("Entered Data :" ,{name,email,password})


//Step 2 : verify whether all data is provided or not
if([name,email,password].some((feild)=>feild?.trim()==="")){
 throw new apiError(400,"All feilds are required !! Check if you've entered name ,email and passord feilds correctly . ")
}


//Step 3 : Check if user already exists 
const existingUser = await User.findOne({email:email})
if(existingUser)
   throw new apiError(400,"User with this Email already Exist , Kindly user a different Email")



//step 4 :Check if all media files are provided or not ,although it is not required feild
/* const avatarLocalPath = req.file?.path
//console.log("File from the multer ",avtarLocalPath);
if(!avatarLocalPath){
   throw new apiError(400,"Kindly provide the Avatar file ! Avatar is required !!")
}
 */

//step 5 : Upload them to cloudinary ,get the url for the image from clodinary response  : Removed this for now
/* const avatar = await uploadOnCloudinary(avatarLocalPath)
if(!avatar){
   throw new apiError(400,"Failed to upload on Cloudinary !!")
}
 */

//Step 6: finally create the new user object and save that to db 
const newUser = await User.create({
   name:name,
   email:email,
   password :password,
   //avatar:avatar?.url
})



//Step 7 : check if user created or not remove sensitive info from the user creation response 
const createdUser = await User.findById(newUser._id).select("-password -refreshToken")

if(!createdUser)
   throw new apiError(500,"Cannot register the user in the DB !!")


//Step 8: send the response
res.status(201).json(new apiResponse(201,createdUser,"User registered Successfully .!!"))


})


const login = asyncWrapper(async (req,res)=>{
   const {email,password}= req.body 
   if([email,password].some((feild)=>feild?.trim()===""))
      throw new apiError(400," Enter Your Email and Password !!")

   const user = await User.findOne({email:email}) ;

   if(!user)
      throw new apiError(404,"No User with this Email Exists !")

   const passwordCheck = await user.isPasswordCorrect(password) ;
   if(!passwordCheck)
      throw new apiError(400,"Incorrect Password , Try Again !! ")

   //Tokens : Using the pre methods in the schema 
   const accessToken =  user.generateAccessToken()
   const refreshToken =  user.generateRefreshToken()

   if(!accessToken )
      throw new apiError(400,"Error occured while generating the accessToken !!")

   if(!refreshToken)
      throw new apiError(400,"Error occured while generating the refreshToken !!")

      //saving this to the user feild 
      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false}) ;
   
      const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


       const cookieOptions =
       {
         httpOnly :true ,
         maxAge:7*24*60*60*1000,
         sameSite:"strict",
         secure :process.env.NODE_ENV
       }  
       return res.status(200)
       .cookie("accessToken",accessToken,cookieOptions)
       .cookie("refreshToken",refreshToken,cookieOptions)
       .json(new apiResponse(201,loggedInUser,"Successfully Logged In !"))


})


const logout = asyncWrapper(async (req,res)=>{
   const user = await User.findByIdAndUpdate(req.user?._id , 
      { $unset:{refreshToken:""} },{new:true})

      const cookieOptions =   {
         httpOnly :true ,
        // maxAge:7*24*60*60*1000, : not necessary
         secure :process.env.NODE_ENV
       }

       return res.status(201)
       .clearCookie("accessToken",cookieOptions)
       .clearCookie("refreshToken",cookieOptions)
       .json(new apiResponse(201,{},"Successfully logged out the User !!"))
})


const updateAvatar  = asyncWrapper(async(req,res)=>{
 const avatarLocalPath = req.file?.path

 if(!avatarLocalPath)
   throw new apiError(400,"Kindly select a new Photo for avatar !!")

 const newAvatar = await uploadOnCloudinary(avatarLocalPath)
  if(!newAvatar.url)
   throw new apiError(400,"Error while uploading on Cloudinary !!")

// Finding the user updating the feild and selecting the sensitive feild to skip 
const updatedUser = await User.findByIdAndUpdate(req.user?._id,
   {
      $set:{
      avatar:newAvatar.url,
   }
},
   {new:true}) .select("-password -refreshToken")


   if(!updatedUser)
      throw new apiError(500,"Internal Server Error : Cannot find or Update the user !!")

   res.status(201)
   .json(new apiResponse(201,updatedUser,"Your Profile picture has been updated Successfully !!"))

})


const getCurrentUser = asyncWrapper(async (req,res)=>{
   const currentUser = req.user

   if(!req.user)
      throw new apiError(400,"You are not Logged In !!")

   res.status(200).json(new apiResponse(200,currentUser,"Current User Fetched !!"))
}) 



export {registerUser,login,logout,updateAvatar,getCurrentUser }