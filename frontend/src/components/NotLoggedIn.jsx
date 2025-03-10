import React from 'react'
import Alert from './Alert'
import Logo from './Logo'
function NotLoggedIn() {
  return (
    <div  className='flex  justify-center w-full my-2  '>
        <div className={`mx-auto w-3/4  bg-white shadow rounded-xl  `}>
           


            <div className='mb-2  flex justify-center h-80' >
                <img src='/notloggedin.jpg' />
            </div>

            <div className='mb-2 p-4 flex justify-center' >
                <Alert
                linkTitle="Login"
                 msg =" You're not Logged in , Kindly login to Access this Page ..! " 
                 to ="login"
                 />
            </div>



        </div>

     </div>   
  )
}

export default NotLoggedIn