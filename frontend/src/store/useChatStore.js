import { create } from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../utils/axios.js";
import extractTextFromHtmlResponse from '../utils/htmlParser.js'
const useChatStore = create((set,get)=>({
    currentSelectedChat:null,
    allChats:[],
    selectedChatMessages:[],
    isAllChatsLoading:false,
    isChatMessagesLoading:false,
    isMessageSending:false,

    getAllChats:async()=>{
    try {
        set({isContactsLoading:true}) ;
        const response =await axiosInstance.get("/chats/all-chats")
  
        set({allChats:response.data?.data})
        
    } catch (error) {
        const errorMsg = extractTextFromHtmlResponse(error.response?.data)
        toast.error(`Failed to fetch all the chats ⚠️ : ${errorMsg}`)
            }finally{
                set({isContactsLoading:false}) ;
            }
        
    } ,
    getChatMessages : async(userId)=>{
        try {
            set({isMessagesLoading:true})
            const response = await axiosInstance.get(`/chats/conversation/${userId}`)
            //console.log('Tis is the chat between these two users',response)

            set({selectedChatMessages:response.data?.data})
        } catch (error) {
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(`Failed to fetch all the Messages  : ${errorMsg}`)
        }
    },
    setCurrentSelectedChat : (selectedChat)=>{
        //set({selectedChatMessages:null})
        set({currentSelectedChat:selectedChat})
    }
        
    ,
    sendMessage:async(data)=>{
            const {currentSelectedChat,selectedChatMessages} =get()
           // console.log({currentSelectedChat,selectedChatMessages})
           
            try {
                set({isMessageSending:true})
               // console.log("Incoming Dtaa",data)
                const response = await axiosInstance.post(`/chats/send-message/${currentSelectedChat?._id}`,data)

                console.log("response from sending the message:: ",response);

                set({selectedChatMessages:[...selectedChatMessages,response.data.data]})

            } catch (error) {
                const errorMsg = extractTextFromHtmlResponse(error.response?.data)
                toast.error(`Failed to send the message : ${errorMsg}`)
            }finally{
                set({isMessageSending:false})
            }

    }
}))

export  {useChatStore}