import React,{useState} from 'react'
import useSendMessage from "../../hooks/useSendMessage.js";

const MessageInput = () => {
   const {loading,sendMessage}=useSendMessage();

   const [message, setMessage] = useState("");
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!message) return;
     await sendMessage(message);
     setMessage("");
   };





  return (
    <div class="flex items-center bg-gray-50 rounded-lg shadow-md p-4">
       <form onSubmit={handleSubmit}>

    <input 
      type="text" 
      class="flex-grow px-4 py-2 md:pr-64 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
      placeholder="Type your message..."
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
    />
    <button 
      class="px-2 md:px-4 py-2 bg-purple-500 text-white rounded-r-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      Send
    </button>


       </form>
  </div>
  

  )
}

export default MessageInput
