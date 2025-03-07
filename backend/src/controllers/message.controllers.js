import { asyncWrapper,apiError,apiResponse ,uploadOnCloudinary } from "../utils/utilsDirectory.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";


const getAllChats = asyncWrapper(async(req,res)=>{
    const allChats = await User.find({_id:{$ne:req.user?._id}}).select("-password -refreshToken")

    if(!allChats)
        throw new apiError(501,"Cannot fetch all the Chats !!")

     res.status(200).json(new apiResponse(200,allChats,"Fetched All Chats Successfully !! "))
})

const getMessagesBetweenUsers = asyncWrapper(async(req,res)=>{
    //get the id of the user we want to chat in the params 
    const {id:userToChatWith} = req.params
    const myUserId = req.user?._id
    const messages = await Message.find({
        $or:[
            {sender:myUserId,receiver:userToChatWith},
            {sender:userToChatWith,receiver:myUserId}  
        ]
    })

    if(!messages)
        throw new apiError(501,"Unable to fetch chats with this user !!")

    res.status(200).json(200,messages,"Fethced all messeages with this User  !!")
})


const sendMessage = asyncWrapper(async(req,res)=>{
    const  {id:receiverId} = req.params
    const {text}=req.body
    const mediaLocalPath= req.file?.media

    let mediaUrl ;
    if(mediaLocalPath){
         const response = await uploadOnCloudinary(mediaLocalPath)
        if(!response)
            throw new apiError(400,"Error while uploading on Cloudinary !!")
        mediaUrl = response.url ;
    }

    const newMessage = await Message.create ({
        sender:req.user?._id,
        receiver:receiverId,
        text:text.trim(),
        media :mediaUrl
    })

    if(!newMessage)
        throw new apiError(501,"Cannot send this message !!")

    //Here will go the Socket IO code


    res.status(201).json(new apiResponse(201,newMessage,"Message Sent !"))


})








export{getAllChats,getMessagesBetweenUsers,sendMessage}