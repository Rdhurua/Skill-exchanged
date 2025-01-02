import React from 'react'
import {useAuthContext} from "../Authroute/AuthContext.jsx";
import useConversation from '../zustand/useConversation';
const Message = ({message}) => {
  const {selectedConversation}=useConversation();
 const fromHim=(message.senderId===selectedConversation._id);
  // console.log(fromMe);
  const className=fromHim?"flex items-center mb-4":"flex items-center justify-end mb-4";
  const imageSrc=fromHim?selectedConversation.profilePicture.data:"https://ashisheditz.com/wp-content/uploads/2023/11/boys-dp-instagram.jpg";
  const textColor=fromHim?"bg-pink-300 text-black":"bg-blue-300 text-black";
  return (
    <>
    <div class={className}>
      <img 
        src={imageSrc}
        alt="User" 
        class="w-10 h-10 rounded-full border border-gray-300"
      />
      <div class={`ml-4  p-3 rounded-lg shadow-sm ${textColor}`}>
        <p class="text-sm ">{message.message}</p>
        <span class="text-xs">2:34 PM</span>
      </div>
    </div>
   {/* <div class="flex items-center justify-end mb-4">
      <div class="mr-4 bg-blue-500 text-white p-3 rounded-lg shadow-sm">
        <p  class="text-sm">Hi, this is a reply!</p>
        <span class="text-xs text-gray-200">2:35 PM</span>
      </div>
    </div> */}
   
  </>
  )
}

export default Message
