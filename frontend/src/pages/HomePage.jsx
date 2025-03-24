import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import {useChatStore} from "../store/useChatStore.js"
import ChatContainer from '../components/ChatContainer.jsx'
import NoChatSelected from '../components/NoChatSelected.jsx'
import Sidebar from '../components/Sidebar.jsx'


function HomePage() {
  const {currentSelectedChat} = useChatStore()



    
  return (
    <div className='h-screen bg-base-200  '>
      <div className='flex items-center justify-center pt-20 px-4 '>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[cal(100vh-8rem)]'>
            <div className='flex h-full rounded-lg overflow-hidden'>
               <Sidebar />
               {!currentSelectedChat ? <NoChatSelected />:<ChatContainer/>}
            </div>
        </div>
        
      </div>
      </div>
  )
}

export default HomePage