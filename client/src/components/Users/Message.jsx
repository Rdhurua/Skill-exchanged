import React from 'react'
import {useAuthContext} from "../../Authroute/AuthContext.jsx";
import useConversation from '../../zustand/useConversation.js';
import {extractDateTime} from "../../utils/extractTime.js";

const Message = ({message}) => {
  const {selectedConversation,me}=useConversation();
   const {authUser}=useAuthContext();
  
 const fromHim=(message.senderId===selectedConversation._id);
  const className=fromHim?"flex items-center mb-4":"flex items-center justify-end mb-4";
  const imageSrc=fromHim?selectedConversation.profilePicture.data:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
  const textColor=fromHim?"bg-pink-300 text-black":"bg-blue-300 text-black";

  const Time = extractDateTime(message.createdAt).time;
  const Date=extractDateTime(message.createdAt).date;

  return (
    <>
   <div class={className}>
  <img 
    src={imageSrc}
    alt="User" 
    class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300"
  />
  <div class={`ml-3 sm:ml-4 p-2 sm:p-3 rounded-lg shadow-sm flex flex-col ${textColor} bg-amber-100 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg break-words w-auto`}> 
    <p class="text-xs sm:text-sm">{message.message}</p>
    <div class="flex justify-between text-gray-500 text-xs mt-1">
      <span>{Time}</span>
      <span>{Date}</span>
    </div>
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
