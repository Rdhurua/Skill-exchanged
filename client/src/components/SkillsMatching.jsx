import React, { useState } from "react";
import axios from 'axios';
import { useNavigate,useLocation } from "react-router-dom"; 
import { GrPowerReset } from "react-icons/gr";

const SkillsMatching = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state?.data || {});


  const [selectedSkills, setSelectedSkills] = useState([]);
  const [results, setResults] = useState([]);
  const [checker,setChecker]=useState(false);
  const navigate = useNavigate(); 

  
  const availableSkills = ["Farming", "Weaving", "Crafting", "Teaching", "web developing"];
  // const users = [
  //   { id: 1, name: "Asha Devi", skills: ["Farming", "Weaving"], location: "Village A" },
  //   { id: 2, name: "Radha Kumari", skills: ["Teaching"], location: "Village B" },
  //   { id: 3, name: "Seema Singh", skills: ["Crafting", "Weaving"], location: "Village C" },
  // ];

  const handleSkillSelect = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    
  };

  const handleSearch = async () => {
    if(selectedSkills.length==0){
      alert("choose the matching skill to search");
    }
  else { 
    try {
      const response = await axios.post("https://skill-exchange-server.onrender.com/users/skillMatch", {
        Skills: selectedSkills, // Pass selected skills
        userId:data._id,
      });
  
    
      if (response.status === 200) {
        setResults(response.data); 
        setChecker(true);
      } else {
        alert("Some error is encountered");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Some error occurred");
    }}
  };

  // const handleSendRequest = () => {
  //   // Navigate to UserProfile or Home page
  //   navigate(`/userProfile`,{state:{data:data}}); // Pass userId or any data you need
  // };

   const resetSelect=()=>{
    setSelectedSkills([]);
    setChecker(false);
    setResults([]);
   }
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Skill Matching Platform
      </h1>

      {/* Skill Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Select Skills You Want to Learn:</h2>
         <button className="rounded-lg text-lg px-3 py-1 hover:bg-green-500 bg-green-400" onClick={resetSelect}>< GrPowerReset  /></button>

        </div>
        <div className="flex flex-wrap gap-4">
          {availableSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSkillSelect(skill.toLowerCase())}
              className={`px-4 py-2 rounded-full ${
                selectedSkills.includes(skill.toLowerCase())
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-blue-400 hover:text-white`}
            >
              {skill}
            </button>
          ))}
        </div>

        <div className="text-right mt-4">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
           Match whatever u want to learn
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8 max-w-4xl mx-auto">
       { checker && <h2 className="text-2xl font-semibold mb-4">Matched Users:</h2>}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">
                  <strong>Skills:</strong> {user.Skills.join(", ")}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                   // Navigate on click
                >
                  Send Request
                </button>
              </div>
            ))}
          </div>
        ) : checker &&(
          <p className="text-gray-500 text-center">
            No matches found. Try selecting other skills.
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillsMatching;
