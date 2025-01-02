import React from 'react'
import Message from './Message'
import useConversation from '../zustand/useConversation.js';
import useGetMessage from '../hooks/useGetMessages.js';
const Messages = () => {
  
  const{messages}=useConversation();
  return (
    <div className='flex flex-col h-full bg-gray-50 rounded-lg shadow-md overflow-y-auto p-4'>

      {messages.map((message,idx)=>(
         <Message message={message}/>
      ))
      }
    </div>
  

  )
}

export default Messages
