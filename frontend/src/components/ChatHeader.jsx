import React from 'react'
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
function ChatHeader() {
 
    const { currentSelectedChat, setCurrentSelectedChat } = useChatStore();
    
    const {activeUsers} =useAuthStore()
    return (
      <div className="p-3 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={currentSelectedChat.avatar || "/avatar.png"} alt={currentSelectedChat.name} />
              </div>
            </div>
  
            {/* User info */}
            <div>
              <h3 className="font-medium">{currentSelectedChat.fullName}</h3>
              <p className="text-sm text-base-content/70">
                {activeUsers?.includes(currentSelectedChat._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
  
          {/* Close button */}
          <button onClick={() => setCurrentSelectedChat(null)}>
            <X />
          </button>
        </div>
      </div>
    );
  
}

export default ChatHeader