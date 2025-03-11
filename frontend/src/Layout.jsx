import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'


function Layout() {
 
  return (
    <div>
       <Toaster/>
        <Navbar />
        <Outlet/>
       
     
    </div>
  )
}

export default Layout