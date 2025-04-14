import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import MessageContainer from "./MessageContainer.jsx"
import useConversation from "../../zustand/useConversation.js"
// import useGetMessage from '../../hooks/useGetMessages.js';
// import { useAuthContext } from '../../Authroute/AuthContext.jsx';

const SkillsMatchResult = ({results,checker,participant1}) => {


const[loading,setLoading]=useState(false);
const [viewProfile, setViewProfile] = useState(false);
const [key, setKey] = useState(null);
const [isOverlayOpen, setIsOverlayOpen] = useState(true);
const [isMessageContainerOpen, setIsMessageContainerOpen] = useState(false);
const {setMessages,setSelectedConversation,selectedConversation,setLoggedId}=useConversation()

const [currentParticipant, setCurrentParticipant] = useState(null); //connecting to id

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



const handleConversation = async (id) => {
  setIsOverlayOpen(false); // Hide the overlay
  setIsMessageContainerOpen(true);
  setCurrentParticipant(id); 
  // setSelectedConversation(user);
  setLoggedId(participant1);

};
  const handleViewProfile = (index) => {
      if (viewProfile && key === index) {
        setViewProfile(false);
        setKey(null);
        
      } else {
        setViewProfile(true);
        setKey(index);
        setIsOverlayOpen(true);
      }
    };



  return (
    <div className="mt-8 max-w-4xl mx-auto">
    {checker && (
      <h2 className="text-2xl font-semibold mb-4">Matched Users:</h2>
    )}
    {results.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800">
              {user.name}
            </h3>
            <p className="text-gray-600">
              <strong>Skills:</strong> {user.Skills.join(", ")}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={() => handleViewProfile(index)} // Use arrow function to avoid direct invocation
            >
              View Profile
            </button>
          </div>
        ))}

        {/* Overlay for user details */}
        {results.map((user, index) => (
          <div key={`overlay-${index}`}
            className={`relative ${viewProfile && key === index ? "relative" : "hidden"}`}>
            {/* Overlay */}
            <div>
               {isOverlayOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

                <div className="bg-white w-full max-w-2xl h-auto rounded-lg shadow-lg p-6">
    
                  <div className="flex justify-between items-center border-b pb-3">
                     <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
                        <button className="text-red-500 hover:text-red-600 text-3xl"onClick={() => {
                 setIsOverlayOpen(false); setIsMessageContainerOpen(false);}}> <IoMdCloseCircle /> </button>
              </div>

      {/* User Info */}
      <div className="mt-4">

        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-violet-200 to-pink-200 p-3">
          <img src={user.profilePicture.data} alt="loading"className="w-36 h-36 rounded-full"/>
          <p className="text-gray-900 font-semibold text-xl">{user.name}</p>
        </div>

        <div className="mt-3 py-3">
          <h2 className="font-semibold text-gray-700 text-xl underline">Skills</h2>
          <ul className="flex flex-wrap gap-3 mt-2">
            {user.Skills.map((skill, skillIndex) => (
              <li key={skillIndex}
                className="px-4 py-2 bg-purple-200 text-purple-700 rounded-lg shadow-sm font-semibold">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 py-3">
          <h2 className="font-semibold text-gray-700 text-xl underline">
            Courses Providing
          </h2>
          {user.Course.length > 0 ? (
            <ul className="flex flex-wrap gap-3 mt-2">
              {user.Course.map((course, courseIndex) => (
                <li
                  key={courseIndex}
                  className="px-4 py-2 bg-purple-200 text-purple-700 rounded-lg shadow-sm font-semibold"
                >
                  {course}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center font-semibold mt-2 text-lg">
              Currently not providing any Courses
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
          onClick={() => {setIsOverlayOpen(false);setIsMessageContainerOpen(true);handleConversation(user._id);
            setSelectedConversation(user);}}>Start Chat</button>
      </div>
    </div>
  </div>
     )}


     {isMessageContainerOpen && (
  <div className="fixed inset-0 z-50 bg-gradient-to-r from-violet-200 to-pink-200 flex items-center justify-center p-4 sm:p-6 md:p-8">
  {/* Close Button */}
  <button
    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl"
    onClick={() => { setIsMessageContainerOpen(false); setIsOverlayOpen(true); setSelectedConversation(null); }}
  >
    <IoMdCloseCircle />
  </button>

  {/* Message Container */}
  <div className="p-4 sm:p-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-gray-100 rounded-lg shadow-lg mx-2 sm:mx-4">
    <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">
      Chat with {user.name}
    </h2>
    <MessageContainer />
  </div>
</div>

          )}

    </div>
          </div>
        ))}
      </div>
    ) : (
      checker && (
        <p className="text-gray-500 text-center">
          No matches found. Try selecting other skills.
        </p>
      )
    )}
  </div>
  )
}

export default SkillsMatchResult
