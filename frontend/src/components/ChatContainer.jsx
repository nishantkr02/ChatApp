import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Loader } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from "./Skeletons/MessageSkeleton"
import StartChat from './StartChat';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../utils/timeParser';
import { useRef } from 'react';


function ChatContainer() {

    const {isChatMessagesLoading,getChatMessages,currentSelectedChat,selectedChatMessages,subscribeToMessages,unsubscribeFromMessages}= useChatStore()
     
     const {currentUser}= useAuthStore()

    const messageEndRef = useRef(null)

    useEffect(()=>{
      getChatMessages(currentSelectedChat._id )
      subscribeToMessages()

      return ()=>{
        unsubscribeFromMessages()
      }
    },[currentSelectedChat._id,getChatMessages,subscribeToMessages,unsubscribeFromMessages])
   
    //This is scrolling down to the last sent message :: how the fuck ??
    useEffect(()=>{
      if(messageEndRef.current && selectedChatMessages)
      messageEndRef.current.scrollIntoView({behavior:"smooth"}) ;

    },[selectedChatMessages])
   
    if(isChatMessagesLoading)
        return (
            <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
          </div>
    )
    //console.log("Chat messages :: ",selectedChatMessages);

  return (
    <div className='flex-1  flex flex-col overflow-auto '>
        <ChatHeader />
        <div className='flex-1  flex flex-col overflow-auto  '>
        {selectedChatMessages?.length===0 ? <StartChat/>:
        <div className='w-full h-80 mb-10 py-2 '>
         {selectedChatMessages?.map((message)=>(
          <div
          key={message._id}
          className={`chat ${message.sender===currentSelectedChat?._id ?"chat-start":"chat-end"}`}
          ref={messageEndRef}
          >
             {/* All custom classes like chat-end and chat-start class are from daisy ui */}

         <div className='chat-image avatar mx-2 mb-4'> 
          <div className='size-10 rounded-full border'>
            <img src={message.sender===currentSelectedChat?._id ?currentSelectedChat?.avatar || "/avatar.png" : currentUser.avatar || "/avatar.png"}  alt='chat dp' />
          </div>
          </div>

         
          <div className='chat-bubble flex flex-col mb-4 '>
            {
              message.media && (
                <img 
                src={message.media}
                alt='attachment'
                className='sm:max-w-[100px] rounded-md mt-2'
                />
              )
            }
            {message.text && <p>{message.text}</p>}

            </div>
            <div className='chat-header mb-1'>
            <time className='text-xs opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
            </div>

         </div>))} 
          
        </div>}
        </div>
            <div className=''>
            <MessageInput />
            </div>
      


    </div>
  )
}

export default ChatContainer