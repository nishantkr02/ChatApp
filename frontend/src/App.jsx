import './App.css'
import Layout from './Layout'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
function App() {

  const {currentUser ,checkAuthStatus} = useAuthStore()

  useEffect (()=>{
    checkAuthStatus()
  },[checkAuthStatus])

  console.log("Current Authenticated user is :",currentUser)
  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default App
