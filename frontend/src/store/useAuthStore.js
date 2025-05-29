import {create} from 'zustand'
import {axiosInstance} from "../utils/axios.js"
import toast from "react-hot-toast"
import extractTextFromHtmlResponse from '../utils/htmlParser.js'

import  {io} from "socket.io-client"


   const BASE_URL  = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/"; //setting up production env

   //"http://localhost:4000/" // the backend url

   //const useAuthStore = create((set,get)=>({}))
    const useAuthStore = create((set,get)=>({
      currentUser:null,
      isSigningUp :false,
      isLoggingIn:false,
      isUpdatingProfile:false,
      isCheckingAuth :true,
      isProfileUpdating:false,
      socket:null ,
      activeUsers:null ,


      //when we refresh the page , it will used for loading screen
      checkAuthStatus :async()=>{
         try {
            const response= await axiosInstance.get('/user/current-user');
          
               set({currentUser :response.data?.data})
               get().connectSocket()
         } catch (error) {
            console.log("Error while fetching the current user via axios :: ", error)
            set({currentUser:null})
         } finally{
            set({isCheckingAuth:false})
         }
      },
      signUp : async(data,navigate)=>{
        
         try {
            set({isSigningUp:true})
            const response = await axiosInstance.post('/user/register-user',data)
            //set({currentUser :response.data?.data})
            toast.success("User Registered Successfully .")
           
            setTimeout(() => navigate("/login"), 2000);
         } catch (error) {
            console.log("Error while signing up user via axios :: ", error) 
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(`Failed to register the user ⚠️ : ${errorMsg}`)
         }finally{
            set({isSigningUp:false}) ;
           
           
         }

      },
     

      login:async(data,navigate)=>{
         try {
            set({isLoggingIn:true} )
            const response = await axiosInstance.post('/user/login',data)
            set({currentUser:response.data?.data})
            //console.log("Current User",response.data.data)
           toast.success(` Successfully Logged in . Welcome ,  ${response.data?.data.name} 🎉`)
            /* toast("Logged In Successfully !", {
               icon: "🔥",
               style: { border: "1px solid red", padding: "16px" },
             }); */
             get().connectSocket()
            navigate("/")
         } catch (error) {
            console.log("Error while loging In the user via axios :: ", error) 
        
            //toast.error(`Failed to Login the user : ${error.message}`)
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(` Login Failed  : ${errorMsg}`)
         }finally{
            set({isLoggingIn:false})
         }
         

      },
      logout:async(navigate)=>{
         try {
            const response  = await axiosInstance.get('/user/logout')
           /*  const newActiveUsers = get().activeUsers.filter((user)=>user._id!==currentUser._id)
            set({activeUsers:newActiveUsers}) */
            set({currentUser:null})
            toast.success("User logged out ");
            get().disconnectSocket()
            setTimeout(() => navigate("/login"), 1500);
           
         } catch (error) {
            //toast.error(`Internal Server Error : ${error.message}`)
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(`Failed to Logout : ${errorMsg}`)
         }
      }
      ,
      updateAvatar: async(data)=>{
         try {
            set({isProfileUpdating:true})
            const response = await axiosInstance.patch("/user/update-avatar",data)
            console.log("Response from axios :",response.data.data.avatar)

               toast.success("Avatar Updated Successfully  🎉")
              // set({currentUser:{...currentUser,avatar:response.data.data.avatar}}) : giving some error

               set((state) => ({
                  currentUser: { ...state.currentUser, avatar: response.data.data.avatar }
                }));
            
         } catch (error) {
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(`Failed to Update the Avatar ⚠️ : ${errorMsg} `)
         }finally{
               set({isProfileUpdating:false})
         }
      },
       //for connecting to the socket whenever we need like , right after login
       connectSocket : ()=>{
         const {currentUser}= get()
         if(!currentUser || get().socket?.connected)
            return  ; 
         

          //The query object allows you to send custom key-value data as query parameters during the initial handshake with the Socket.IO server.
         const socket = io(BASE_URL,{
            query:{
               userId:currentUser?._id
            }
         })
         socket.connect() ;
         //console.log("Socket instance :",socket)
         set({socket:socket})

         //Listening for events :: This is gonna tell a user what other users are online ::
         socket.on("checkOnlineUsers",(onlineUserIds)=>{
               set({activeUsers:onlineUserIds})
         })





       },
        //for dissconnecting to the socket whenever we need like , right after logout
      disconnectSocket : ()=>{
         
            if(get().socket?.connected)
              {
               get().socket.disconnect()
               set({socket:null})
              }
      },
    }))


    export {useAuthStore}