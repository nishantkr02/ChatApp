import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {LoginPage,SignUpPage,ProfilePage,SettingsPage, HomePage} from "./pages/pages.js"



const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>} >
    <Route path ="" element={<HomePage/>}/>
    <Route path='signup' element={<SignUpPage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='settings' element={<SettingsPage/>} />
    <Route path='profile' element={<ProfilePage/>} />


  </Route>
))


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>
)
