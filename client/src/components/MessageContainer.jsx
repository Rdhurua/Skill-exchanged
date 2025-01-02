import React  from 'react'
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from '../zustand/useConversation';
import useGetMessage from '../hooks/useGetMessages';


const MessageContainer = () => {
  //  const{loading}=useGetMessage();
   const{selectedConversation}=useConversation();

  return (
    <div class="flex flex-col h-[90vh]  bg-gray-100">
 
  <div class="flex justify-start items-center bg-white p-4 rounded-lg shadow-md mb-4">
    <img 
      src={selectedConversation.profilePicture.data} 
      alt="Profile" 
      class="w-16 h-16 rounded-full border border-gray-300"
    />
    <span class="ml-4 text-lg font-semibold text-gray-800">{selectedConversation.name}</span>
  </div>

 
  <div class="flex-grow overflow-y-auto bg-white rounded-lg shadow-md p-4 mb-4">
    
    <Messages />
  </div>

 
  <div class="bg-white p-4 rounded-lg shadow-md">
    
    <MessageInput />
  </div>
</div>

    
   
  )
}

export default MessageContainer
