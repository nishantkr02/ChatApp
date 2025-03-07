import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true ,
        unique:true
    },
    password:{
        type:String,
        required:true 
    },
    avatar:{
        type:String,
       
    },
    refreshToken:{
        type:String,
        default:""
    }

},{timestamps:true})



//Pre-hook to hash the password , everytime we need to save it
userSchema.pre("save",async function(next){
    try {
        if(!this.isModified("password"))
            return next();
        this.password = await bcrypt.hash(this.password,10) 
        next();
        
    } catch (error) {
        console.log("Attention ,the password was not hased before saving : ",error)
    }
} )

// Custom Methods on this userSchema :::::::::::::::::

// bcrypt.compare(input password,savedPassword) : to check the password 
userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password,this.password) 
        //it will return a boolean response 
}


//Method to generate access token : jwt.sign(payload,secretCode,{expiresIn:expirytime})
userSchema.methods.generateAccessToken = function(){
    const payload = {
        _id:this._id ,
        password :this.password,
        name:this.name
    }
   return  jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})   
}

//Method to generate Refresh token :
userSchema.methods.generateRefreshToken = function(){
    const payload = {
        _id:this._id 
       /*  password :this.password,
       name:this.name 
        refresh token has less info compare to the access token
       */  
      
    }  
     return  jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})  
}


export const User = mongoose.model("User",userSchema)