import React, { useState, useEffect } from "react";
import { IoMdNotifications, IoMdCloseCircle } from "react-icons/io";
import useConversation from "../../zustand/useConversation";
import MessageContainer from "./MessageContainer";
import axios from "axios";

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageContainerOpen, setIsMessageContainerOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const {setMessages,setSelectedConversation,selectedConversation,setLoggedId}= useConversation();
const [currentParticipant, setCurrentParticipant] = useState(null); 
const[loading,setLoading]=useState(false);
 
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/conversation/conv/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

useEffect(() => {
  let intervalId; // To store the interval ID

  const getMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/messages/getMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participant1,
          participant2: currentParticipant,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages(data);
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching messages:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (currentParticipant) {
 
    getMessage();
    intervalId = setInterval(getMessage, 1000);
  }
  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [currentParticipant]);


  const getDetails = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/getInfo/${id}`);
      console.log(response.data.user);
      return response.data.user; // Return user data directly
    } catch (error) {
      console.error("Error in fetching user details:", error.response?.data?.message || error.message);
      return null;
    }
  };


// useEffect(() => {
//   let intervalId; // To store the interval ID

//   const getMessage = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BASE_URL}/messages/getMessage`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           participant1:userId,
//           participant2: currentParticipant,
//         }),
//       });
//       const data = await res.json();
//       if (data.error) {
//         throw new Error(data.error);
//       }
//       setMessages(data);
//     } catch (error) {
//       toast.error(error.message);
//       console.error("Error fetching messages:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (currentParticipant) {
 
//     getMessage();
//     intervalId = setInterval(getMessage, 1000);
//   }
//   return () => {
//     if (intervalId) clearInterval(intervalId);
//   };
// }, [currentParticipant]);



  // Handle click on a conversation
  const handleConversation = async (id) => {
    const user = await getDetails(id);
    if (!user) return;
    setSelectedConversation(user);
    setLoggedId(userId);
    setCurrentParticipant(id)
    setIsMessageContainerOpen(true);
  };

  return (
    <div className="relative">
      {/* Notification Icon */}
      <button
        className="relative p-2 text-white bg-purple-500 rounded-full hover:bg-purple-600 focus:outline-none left-14"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMdNotifications className="text-2xl" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-2 border-red-600 text-center rounded-lg">Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((chat) => {
              const otherUserId = chat.participants.find((id) => id !== userId);
              
              return (
                <div
                  key={chat._id}
                  className="p-3 border-b border-gray-200 hover:bg-purple-400 hover:text-white cursor-pointer"
                  onClick={() => {
                    setIsOverlayOpen(false);
                    handleConversation(otherUserId);
                  }}
                >
                  <p className="text-sm font-medium  text-center">Check Conversation </p>
                  <p className="text-xs text-gray-500">{chat.latestMessage}</p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-600">No new messages</p>
          )}
        </div>
      )}

      {/* Message Overlay */}
      {isMessageContainerOpen && selectedConversation && (
        <div className="fixed inset-0 z-50 bg-gradient-to-r from-violet-200 to-pink-200 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl"
            onClick={() => {
              setIsMessageContainerOpen(false);
              setIsOverlayOpen(true);
              setSelectedConversation(null);
            }}
          >
            <IoMdCloseCircle />
          </button>

          {/* Message Container */}
          <div className="p-4 sm:p-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-gray-100 rounded-lg shadow-lg mx-2 sm:mx-4">
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">
              Chat with {selectedConversation.name}
            </h2>
            <MessageContainer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
