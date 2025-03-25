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
    <div class="flex items-center bg-gray-50 rounded-lg shadow-md p-3 sm:p-4 md:p-5 w-full max-w-3xl mx-auto">
    <form onSubmit={handleSubmit} className="flex w-full">
      <input 
        type="text" 
        class="flex-grow px-3 py-2 sm:px-4 sm:py-3 md:pr-56 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base" 
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button 
        class="px-3 sm:px-4 py-2 sm:py-3 bg-purple-500 text-white rounded-r-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
      >
        Send
      </button>
    </form>
  </div>
  

  )
}

export default MessageInput
