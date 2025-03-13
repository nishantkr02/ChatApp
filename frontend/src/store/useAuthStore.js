import {create} from 'zustand'
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast"
import extractTextFromHtmlResponse from '../lib/htmlParser.js'
//const useAuthStore = create(()=>({}))
 
    const useAuthStore = create((set)=>({
      currentUser:null,
      isSigningUp :false,
      isLoggingIn:false,
      isUpdatingProfile:false,
      isCheckingAuth :true,
      //when we refresh the page , it will used for loading screen
      checkAuthStatus :async()=>{
         try {
            const response= await axiosInstance.get('/user/current-user');
          
               set({currentUser  :response.data})

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
            
            toast.success("User Registered Successfully .")
            setTimeout(() => navigate("/login"), 3000);
         } catch (error) {
            console.log("Error while signing up user via axios :: ", error) 
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(`Failed to register the user : ${errorMsg}`)
         }finally{
            set({isSigningUp:false}) ;
           
           
         }

      },
      login:async(data,navigate)=>{
         try {
            set({isLoggingIn:true} )
            const response = await axiosInstance.post('/user/login',data)
            set({currentUser:response.data})
            toast.success(" Logged In Successfully .")
            setTimeout(() => navigate("/"), 3000);
         } catch (error) {
            console.log("Error while loging In the user via axios :: ", error) 
        
            //toast.error(`Failed to Login the user : ${error.message}`)
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(`Failed to Login : ${errorMsg}`)
         }finally{
            set({isLoggingIn:false})
         }
         

      },
      logout:async(navigate)=>{
         try {
            const response  = await axiosInstance.get('/user/logout')
            set({currentUser:null})
            toast.success("User logged out Sucessfully !!");
            setTimeout(() => navigate("/"), 3000);
         } catch (error) {
            //toast.error(`Internal Server Error : ${error.message}`)
            const errorMsg = extractTextFromHtmlResponse(error.response?.data)
            toast.error(`Failed to Logout : ${errorMsg}`)
         }
        

      }
    }))


    export {useAuthStore}