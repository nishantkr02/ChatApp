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


const login = asyncWrapper(async (req,res)=>{
   const {email,password}= req.body 
   if([email,password].some((feild)=>feild?.trim()===""))
      throw new apiError(400,"Kindly Enter Your Email and Password !!")

   const user = await User.findOne({email:email}) ;

   if(!user)
      throw new apiError(404,"No User with this Email Exists , Try Again !")

   const passwordCheck = await user.isPasswordCorrect(password) ;
   if(!passwordCheck)
      throw new apiError(400,"The Password you have entered is incorrect !! ")

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
       .json(new apiResponse(201,loggedInUser,"User Successfully Logged In !"))


})


const logout = asyncWrapper(async (req,res)=>{
   const user = await User.findByIdAndUpdate(req.user?._id , 
      { $unset:{refreshToken:""} },{new:true})

      const cookieOptions =   {
         httpOnly :true ,
         maxAge:7*24*60*60*1000,
         sameSite:"strict",
         secure :process.env.NODE_ENV
       }

       return res.status(201)
       .clearCookie("accessToken",cookieOptions)
       .clearCookie("refreshToken",cookieOptions)
       .json(new apiResponse(201,{},"Successfully logged out the User !!"))
})







export {registerUser,login,logout}