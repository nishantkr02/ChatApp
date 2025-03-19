import './App.css'

import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import {Loader} from "lucide-react"
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'


function App() {
  
  const {checkAuthStatus,isCheckingAuth} = useAuthStore()

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
    <div className="App">
        <Toaster
       toastOptions={{
        success: {
          style: {
            background: "#212f3d",  // green background for a clean look
            color: "#f4f6f7",  // yellow text for success
            border: "2px solid #27ae60",  // Green border
            padding: "12px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.2)", // Subtle shadow
          },
          icon: "✔",
        },
        error: {
          style: {
            background: "#212f3d",  // White background for a clean look
            color: "#f4f6f7",  // Red text for error
            border: "2px solid #e74c3c ",  // Red border
            padding: "12px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(211, 47, 47, 0.2)", // Subtle shadow
          },
          icon: "⚠️",
        },
        
      }}
        />
        <Navbar />
        <Outlet/>
      
    </div>
  )
 
}

export default App
