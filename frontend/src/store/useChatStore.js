import { create } from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";
import extractTextFromHtmlResponse from '../lib/htmlParser.js'
const useChatStore = create((set,get)=>({
    currentSelectedChat:null,
    allChats:[],
    selectedChatMessages:[],
    isAllChatsLoading:false,
    isChatMessagesLoading:false,
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
            set({currentChats:response.data?.data})
        } catch (error) {
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(`Failed to fetch all the Messages  : ${errorMsg}`)
        }
    },
    setCurrentSelectedChat : (selectedChat)=>set({currentSelectedChat:selectedChat})
    ,
    sendMessage:async(data)=>{
            const {currentSelectedChat,selectedChatMessages} =get()
            console.log({currentSelectedChat,selectedChatMessages})
            try {
                console.log("Incoming Dtaa",data)
                const response = await axiosInstance.post(`/chats/send-message/${currentSelectedChat?._id}`,data)

                console.log("response from sending the message:: ",response);

                set({currentSelectedChat:[...selectedChatMessages,response.data]})

            } catch (error) {
                const errorMsg = extractTextFromHtmlResponse(error.response?.data)
                toast.error(`Failed to send the message : ${errorMsg}`)
            }

    }
}))

export  {useChatStore}