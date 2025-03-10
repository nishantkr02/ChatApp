import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
function HomePage() {
  const {currentUser } = useAuthStore()


  
  if(!currentUser)
    return<Navigate to="login"/>
  return (
    <div>HomePage</div>
  )
}

export default HomePage