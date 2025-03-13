import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
function HomePage() {
  const {currentUser } = useAuthStore()



    
  return (
    <div className='h-full  mt-10  border border-white'>HomePage</div>
  )
}

export default HomePage