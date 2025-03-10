import {create} from 'zustand'
import {axiosInstance} from "../lib/axios"


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
      signUp : async(data)=>{
         try {
            set({isSigningUp:true})
            const response = await axiosInstance.post('/user/register-user',data)

            
         } catch (error) {
            console.log("Error while signing up user via axios :: ", error) 
         }finally{
            set({isSigningUp:false})
         }

      }
    }))


    export {useAuthStore}