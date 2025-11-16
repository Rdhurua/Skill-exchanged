import React from 'react';
import {showToastMessage,showToastMessage2} from "../../utils/Toasting.js"
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
const Sidebar = ({ setActiveSection }) => {
   const navigate=useNavigate();
  const handleLogout = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
        method: "GET",
      headers:{'Content-Type':"application/json"}
      });

      const data = await response.json();
      if(data.error){
         throw new Error(data.error);
      }
      localStorage.removeItem("token");
      
      showToastMessage("successfully logout!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
    }
    catch(error){
           showToastMessage2(error.message);
    }
  };

  return (
    <div className="bg-gray-900 text-white w-full md:w-64 h-auto md:h-full flex flex-col">
  {/* Header */}
  <div className="p-6 text-2xl font-bold flex justify-center">
    Admin Panel
  </div>

  {/* Navigation Links */}
  <nav className="flex-1">
    <button
      onClick={() => setActiveSection('statistics')}
      className="w-full py-3 px-4 text-left hover:bg-blue-700 border-gray border-b"
    >
      Statistics
    </button>
    <button
      onClick={() => setActiveSection('users')}
      className="w-full py-3 px-4 text-left hover:bg-blue-700"
    >
      User Management
    </button>
  </nav>

  {/* Logout */}
  <button
    onClick={handleLogout}
    className="py-3 px-4 bg-white text-gray-900 flex justify-center gap-2 items-center text-xl font-semibold"
  >
    Logout <IoLogOutOutline className='text-2xl' />
  </button>
</div>

  );
};

export default Sidebar;
