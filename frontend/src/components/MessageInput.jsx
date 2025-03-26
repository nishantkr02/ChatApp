import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Send, X } from "lucide-react";
import toast from 'react-hot-toast';
function MessageInput() {
const[text,setText] = useState("")
const[mediaPreview,setMediaPreview]= useState(null)

const [mediaFile,setMediaFile]= useState(null)
const fileInputRef = useRef(null)
const{sendMessage}= useChatStore()

const handleMediaPreview= async (e)=>{
    const mediaLocalFile = e.target.files[0]
    setMediaFile(mediaLocalFile)

    if(!mediaLocalFile.type.startsWith("image/")){
      toast.error("Please select a image file")
      return;
    }

    setMediaPreview(URL.createObjectURL(mediaLocalFile)); 
  
}
const unselectMedia =() =>{
  setMediaPreview(null)
  if(fileInputRef.current)
    fileInputRef.current.value = null
 setMediaFile(null) 
}



const handleSendMessage = async(e)=>{
e.preventDefault();
console.log("text& media",text,mediaPreview)
 if(!text.trim() && !mediaPreview )
  return ; 

 console.log("text inout",text)

 const formData = new FormData()
 if(mediaFile)
  formData.append("media",mediaFile)

  formData.append("text",text.trim())

try {

  await sendMessage(formData)

  //clear form feilds
  setText("")
  unselectMedia();

} catch (error) {
  toast.error("Error :Unable to send message .")
}
}
  return (
    <div className='p-4 w-full'>
        {mediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={mediaPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={unselectMedia}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
        <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleMediaPreview}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${mediaPreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>

        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !mediaPreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput