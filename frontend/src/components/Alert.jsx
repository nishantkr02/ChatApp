import React from 'react'
import { Link } from 'react-router-dom'

function Alert({msg,to,linkTitle}) 
{
  return (
<div className={`px-4 py-1.5 bg-gray-900 items-center leading-none lg:rounded-full flex  lg:inline-flex  shadow  rounded-xl  `}role="alert">
  
    <span className=" font-semibold mr-2 text-left text-white text-sm flex-auto  ">{msg}</span>
    
    <Link to={`/${to}`} >
  
    <span className=' flex justify-end  rounded-full px-2.5 py-1.5 -mr-2 text-sm bg-red-500 text-white text-bold hover:bg-green-500  transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 '>{`${linkTitle} >`}
 
    </span>
    </Link>
    
    
  </div>




  )
}

export default Alert