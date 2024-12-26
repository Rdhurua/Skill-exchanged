import React from 'react'
import { useState } from 'react';
import { useNavigate,useLocation,useParams } from "react-router-dom"; 
import SkillsMatching from '../components/SkillsMatching'

const Dashbard = () => {
 const {userId}=useParams();
   const navigate = useNavigate(); 
  const handleSendRequest1 = () => {
    
    navigate(`/userProfile/${userId}`); 
  };
  const handleSendRequest2 = () => {
    // Navigate to UserProfile or Home page
    navigate(`/`); // Pass userId or any data you need
  };

  return (
    <div>

         <div className='w-full bg-gray-100 flex justify-center items-center py-3'>
             <button className='text-white text-xl list-none mr-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md' onClick={handleSendRequest2}>Home</button>
             <button className='text-white text-xl list-none px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md' onClick={handleSendRequest1}>userProfile</button>
         </div>
        <h1 className="text-3xl font-bold text-center">Welcome to Your Dashboard</h1>
      
      {/* Other dashboard sections */}
      <div className="mt-8">
        <SkillsMatching userId={userId} />
      </div>
    </div>
  )
}

export default Dashbard
