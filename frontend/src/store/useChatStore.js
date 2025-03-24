import { create } from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";
import extractTextFromHtmlResponse from '../lib/htmlParser.js'
const useChatStore = create((set)=>({
    currentSelectedChat:null,
    allChats:[],
    selectedChatMessages:[],
    isAllChatsLoading:false,
    isChatMessagesLoading:false,
    getAllChats:async()=>{
    try {
        set({isContactsLoading:true}) ;
        const response =await axiosInstance.get("/chat/all-chats")
  
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
            
        }
    },
    setCurrentSelectedChat : (selectedChat)=>set({currentSelectedChat:selectedChat})
}))

export  {useChatStore}