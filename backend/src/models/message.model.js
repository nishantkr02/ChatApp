import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" ,
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String ,
        trim:true
    },
    media:{
        type:String ,
    },
    
},{timestamps:true})

export const Message = mongoose.model("Message",messageSchema)