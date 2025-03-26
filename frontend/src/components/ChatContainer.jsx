import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Loader } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from "./Skeletons/MessageSkeleton"
function ChatContainer() {

    const {isChatMessagesLoading,getChatMessages,currentSelectedChat}= useChatStore()
     const userId = currentSelectedChat._id ;
    useEffect(()=>{
      getChatMessages(userId)
    },[getChatMessages])
        //console.log('Current chat :: ',currentSelectedChat)
    if(isChatMessagesLoading)
        return (
            <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
          </div>
    )

  return (
    <div className='flex-1  flex flex-col overflow-auto'>
        <ChatHeader />

        <p>Message body</p>

        <MessageInput />


    </div>
  )
}

export default ChatContainer