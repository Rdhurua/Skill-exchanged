import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import{ useAuthContext} from "../../Authroute/AuthContext.jsx"
import toast from 'react-hot-toast';
import SkillsMatchResult from "./SkillsMatchResult.jsx";

const SkillsMatching =({userId} ) => {
 
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [results, setResults] = useState([]);
  const [checker, setChecker] = useState(false);
  const availableSkills = ["Farming","Weaving","Crafting","Teaching","web developing",];

  const { authUser,setAuthUser } = useAuthContext();
 const navigate=useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("skill-exchange-user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);



 
  const handleSkillSelect = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSearch = async () => {
    if (selectedSkills.length == 0) {
      alert("choose the matching skill to search");
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/skillMatch`,
          {
            Skills: selectedSkills, // Pass selected skills
            userId: userId,
          }
        );

        if (response.status === 200) {
          setResults(response.data);
          setChecker(true);
        } else {
          alert("Some error is encountered");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Some error occurred");
      }
    }
  };

  const resetSelect = () => {
    setSelectedSkills([]);
    setChecker(false);
    setResults([]);
  };

  

 const [loading, setLoading] = useState(false);

const [conversation,setConversation]=useState([]);
const participant1=userId;

 
  return (
    <div className="bg-gray-100 p-4 sm:p-6 lg:p-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-center text-purple-600 mb-4 sm:mb-6">
      Skill Matching Platform
    </h1>
  
    <div>
      {/* Skill Selection */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-xl sm:max-w-2xl mx-auto">
        <div className="flex justify-between items-center ">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-0">
            Select Skills You Want to Learn:
          </h2>
          <button
            className="flex items-center justify-center rounded-lg text-lg px-3 py-1 bg-green-400 hover:bg-green-500"
            onClick={resetSelect}
          >
            <GrPowerReset />
          </button>
        </div>
  
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
          {availableSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSkillSelect(skill.toLowerCase())}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedSkills.includes(skill.toLowerCase())
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-purple-400 hover:text-white`}
            >
              {skill}
            </button>
          ))}
        </div>
  
        <div className="text-right mt-4">
          <button
            onClick={handleSearch}
            className="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300"
          >
            Match whatever you want to learn
          </button>
        </div>
      </div>
  
      {/* Skill Match Results */}
      <div className="mt-6">
        <SkillsMatchResult
          results={results}
          checker={checker}
          participant1={participant1}
        />
      </div>
    </div>
  </div>
  
  );
}

export default SkillsMatching;
