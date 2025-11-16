import React  from 'react'
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from '../../zustand/useConversation';


import { useState } from 'react';

const MessageContainer = () => {
   const{selectedConversation}=useConversation();
   const [value,setValue]=useState(false);


  return (
    <div class="flex flex-col h-[90vh] bg-gray-100 border border-black p-4 sm:p-6 md:p-8">
 
    <div class="flex items-center bg-white p-4 rounded-lg shadow-md mb-4 w-full max-w-3xl mx-auto">
      <img 
        src={selectedConversation.profilePicture.data} 
        alt="Profile" 
        class="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full border border-gray-300"
      />
      <span class="ml-4 text-base sm:text-lg md:text-xl font-semibold text-gray-800">
        {selectedConversation.name}
      </span>
    </div>
  
    {/* Messages Container */}
    <div class="flex-grow overflow-y-auto bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 w-full max-w-3xl mx-auto">
      <Messages/>
    </div>
  
    {/* Input Container */}
    <div class="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <MessageInput />
    </div>
  </div>
  

    
   
  )
}

export default MessageContainer
