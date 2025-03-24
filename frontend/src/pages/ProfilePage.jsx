import React from 'react'
import { useState } from "react";
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from "lucide-react";
import toast from 'react-hot-toast';



const ProfilePage = () => {
const{currentUser,isProfileUpdating,updateAvatar} = useAuthStore()
const [selectedImg, setSelectedImg] = useState(null);

console.log("Current User",currentUser)



const handleImageUpload = async (e)=>{
const avatarLocalFile = e.target.files[0]
if(!avatarLocalFile){
toast.error('You have not selected any file for upload !!')
return
}
/*
This required to change the  json limit , which is nnot safe , so i went back to my old ways ..
const reader = new FileReader()
reader.readAsDataURL(avatarLocalFile);
reader.onload = async () =>{
const base64Img = reader.result
setSelectedImg(base64Img)
await updateAvatar({avatar:base64Img})
} */
setSelectedImg(URL.createObjectURL(avatarLocalFile)); 

const formData = new FormData()
formData.append("avatar",avatarLocalFile)
  await updateAvatar(formData)

}


  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>

           <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
           </div>
            {/* Avatar logo section with file input */}
            <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || currentUser?.avatar || "/avatar.png"}
                alt="Avatar"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isProfileUpdating ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isProfileUpdating}
                />
              </label>
              </div>
              <p className="text-sm text-zinc-400">
              {isProfileUpdating ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
              </div>

              {/* User Deatails section .... */}
            <div className="space-y-6">

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{currentUser?.name}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{currentUser?.email}</p>
            </div>

          </div>


          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{currentUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>



          
        </div>

      </div>
    

    </div>
  )
}

export default ProfilePage