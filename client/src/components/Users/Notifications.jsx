import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdNotifications } from "react-icons/io";
import { use } from "react";

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
 console.log(userId);
  // Fetch all conversations where the user is involved
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:5900/conversation/conv/${userId}`);
      setNotifications(response.data); // Store all user-related conversations
    } catch (error) {
      console.error("Error fetching notifications:", error.response?.data || error.message);
    }
};
 useEffect(()=>{
   fetchNotifications();
 },[])

  return (
    <div className="relative">
      {/* Notification Icon */}
      <button
        className="relative p-2 text-white bg-purple-500 rounded-full hover:bg-purple-600 focus:outline-none left-14"
        onClick={() => {
          // fetchNotifications(); // Fetch notifications when clicked
          setIsOpen(!isOpen);
        }}
      >
        <IoMdNotifications className="text-2xl" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Overlay Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((chat) => (
              <div
                key={chat._id}
                className="p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => window.location.href = `/chat/${chat._id}`} // Redirect to chat on click
              >
                <p className="text-sm font-medium text-gray-700">
                  Conversation with {chat.participants.find(id => id !== userId)}
                </p>
                <p className="text-xs text-gray-500">{chat.latestMessage}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No new messages</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
