import {create} from 'zustand'
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast"

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
            if(response)
               set({currentUser:response.data})
            toast.success("User Registered Successfully .")
            setTimeout(() => navigate("/login"), 3000);
         } catch (error) {
            console.log("Error while signing up user via axios :: ", error) 
            console.log("Error message:",error.message)
            toast.error(`Internal Server Error : ${error.message}`)
         }finally{
            set({isSigningUp:false}) ;
           
           
         }

      }
    }))


    export {useAuthStore}