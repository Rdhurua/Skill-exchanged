import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement/UserTable.jsx';
import Statistics from './Statistics';
import { ToastContainer} from "react-toastify";
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('statistics'); // Default view

  return (
    <div className="flex flex-col md:flex md:flex-row h-screen">
       <ToastContainer/>
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {activeSection === 'statistics' && <Statistics />}
        {activeSection === 'users' && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
