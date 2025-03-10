import './App.css'
import Layout from './Layout'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import {Loader} from "lucide-react"

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
      <Layout />
    </div>
  )
 
}

export default App
