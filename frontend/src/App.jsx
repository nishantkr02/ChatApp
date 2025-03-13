import './App.css'

import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import {Loader} from "lucide-react"
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'


function App() {
  
  const {currentUser ,checkAuthStatus,isCheckingAuth} = useAuthStore()

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
        <Toaster/>
        <Navbar />
        <Outlet/>
      
    </div>
  )
 
}

export default App
