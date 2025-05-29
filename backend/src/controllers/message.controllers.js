import { asyncWrapper,apiError,apiResponse ,uploadOnCloudinary } from "../utils/utilsDirectory.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId ,io} from "../utils/socket.js";

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
   console.log("req.user :",myUserId)
    console.log('user to chat with :',userToChatWith) 

    const messages = await Message.find({
        $or:[
            {sender:myUserId,receiver:userToChatWith},
            {sender:userToChatWith,receiver:myUserId}  
        ]
    })

    if(!messages)
        throw new apiError(501,"Unable to fetch chats with this user !!")

    res.status(200).json(new apiResponse(200,messages,"Fethced all messeages with this User  !!")
)})


const sendMessage = asyncWrapper(async(req,res)=>{
    const  {id:receiverId} = req.params
    /* console.log("req.params",req.params)
    console.log("req.body",req.body.text);
    console.log("req.file",req.file) */

    const {text}=req.body
    const mediaLocalPath= req.file?.path
            console.log("Text  file",text)
                console.log("media file",mediaLocalPath)

    if(!text && !mediaLocalPath)
        throw new apiError(401,"This message body is empty !! check the frontend")

    let mediaUrl ;
    if(mediaLocalPath){
         const response = await uploadOnCloudinary(mediaLocalPath,"chatMedia")
        if(!response)
            throw new apiError(400,"Error while uploading on Cloudinary !!")
        mediaUrl = response.url ;
        console.log('media url',mediaUrl)
    }
    

    const newMessage = await Message.create ({
        sender:req.user?._id,
        receiver:receiverId,
        text:text?.trim(),
        media :mediaUrl 
    })

    if(!newMessage)
        throw new apiError(501,"Cannot send this message !!")

    //Here will go the Socket IO code
     const receiverSocketId = getReceiverSocketId(receiverId) // this will give the socketId of the receiver
      if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
      }


    //console.log("New message",newMessage)

    res.status(201).json(new apiResponse(201,newMessage,"Message Sent !"))


})








export{getAllChats,getMessagesBetweenUsers,sendMessage}