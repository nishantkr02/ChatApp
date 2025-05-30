

import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import {Loader} from "lucide-react"
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'


function App() {
  
  const {checkAuthStatus,isCheckingAuth,activeUsers} = useAuthStore()
  console.log("Online users",{activeUsers})
  const {currentTheme,switchTheme}= useThemeStore()
  useEffect (()=>{
    checkAuthStatus()
  },[checkAuthStatus])

  if(isCheckingAuth )
    return(
  <div className='flex items-center justify-center h-screen'>
  <Loader className='size-10 animate-spin' />
  </div>
  );


  return (
    <div  data-theme={currentTheme} >
        <Toaster
        
       toastOptions={{
        duration: 5000,
    removeDelay: 1000,
  success: {
    style: {
      background: "#212f3d",               // dark slate background
      color: "#69ea6e",                    // bright green text for success
      padding: "14px 20px",                // more comfortable padding
      fontWeight: "400",                   // semi-bold
      borderRadius: "8px",                 // rounded corners for modern look
      boxShadow: "0 6px 15px rgba(105, 234, 110, 0.3)", // subtle green glow
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      letterSpacing: "0.03em",
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    },
    icon: "✔",
  },
  error: {
    style: {
     background: "#1f2937", // dark gray/charcoal background for contrast
    color: "#ff6b6b", // error red text
    padding: "8px 14px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "2px solidrgb(250, 54, 54)",        // red border to indicate error clearly
    boxShadow: "0 8px 15px rgba(255, 56, 56, 0.25)",  // subtle red glow
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    letterSpacing: "0.03em",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    },
    icon: "⚠️",
  },
}

       }
        />
        
        <Navbar  />
        <Outlet />
        
     
   
      
    </div>
  )
 
}

export default App
