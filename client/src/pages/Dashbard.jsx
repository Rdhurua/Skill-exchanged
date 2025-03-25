import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SkillsMatching from "../components/Users/SkillsMatching";
import {useAuthContext} from "../Authroute/AuthContext.jsx"

const Dashbard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [visibleDiv,setVisibleDiv]=useState(false);
  const [stop,setStop]=useState(false);
  const toggleDiv=()=>{
    setVisibleDiv(!visibleDiv);
    setStop(!stop);
  }
  const { authUser,setAuthUser } = useAuthContext();


  useEffect(() => {
    const storedUser = localStorage.getItem("skill-exchange-user");
    // console.log(storedUser);
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);


  const handleSendRequest1 = () => {
    navigate(`/userProfile/${userId}`);
    console.log(authUser);
  };
  const handleSendRequest2 = () => {
    navigate(`/`); 
  };

  return (
    <div className=" h-full w-full">
      <div className="w-full bg-gray-200 flex justify-center items-center py-3 shadow-md shadow-black sticky top-0">
        <button
          className="text-white text-xl list-none mr-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-md shadow-sm shadow-black"
          onClick={handleSendRequest2}
        >
          Home
        </button>
        <button
          className="text-white text-xl list-none px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-md shadow-sm shadow-black"
          onClick={handleSendRequest1}
        >
          userProfile
        </button>
      </div>

      <div className="flex flex-col items-center mt-4 p-16">
      <h1 className=" text-xl md:text-3xl font-bold text-center">
        Welcome to Skill-Matching
      </h1>

    <button className="bg-green-400 hover:bg-green-500 transition-colors duration-500 px-8 md:px-52 py-2 items-center rounded-md mt-3 text-nowrap text-lg font-semibold text-black shadow-sm shadow-black" onClick={toggleDiv}>{stop?"Stop Matching":"Match skill and Learn new"}</button>
      </div>
      {/* Other dashboard sections */}
     { visibleDiv&&<div className="mt-2">
        <SkillsMatching userId={userId} />
      </div>}
    </div>
  );
};

export default Dashbard;
