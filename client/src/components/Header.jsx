import React, { useState } from 'react';
import Logindia from "./Logindia.jsx";
import logo from "../assets/fg.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="bg-gray-100 text-blue-600 p-4 sticky top-0 z-30 shadow-md shadow-black">
      <nav className="flex flex-col md:flex-row md:justify-between md:items-center max-w-7xl mx-auto">

        {/* Logo and Title */}
        <div className="flex justify-between items-center w-full lg:w-auto ">
          <a href="/">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="logo" className="h-12 w-12 animate-spin-slow" />
              <h1 className="text-2xl font-bold">Skill-Exchange</h1>
            </div>
          </a>

          {/* Hamburger Menu Button (Visible on small screens) */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none text-blue-600">

              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m0 6H4" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:space-x-4 lg:space-x-6 items-center mt-4 md:mt-0">
          <li><a href="/" className="hover:underline text-lg hover:text-blue-700 font-semibold">Home</a></li>
          <li><a href="#About" className="hover:underline text-lg hover:text-blue-700 font-semibold">About</a></li>
          <li><a href="#Features" className="hover:underline text-lg hover:text-blue-700 font-semibold">Features</a></li>
          <li><a href="#" className="hover:underline text-lg hover:text-blue-700 font-semibold">Contact</a></li>
          <li className="lg:ml-4" ><Logindia value={false} /></li>

        </ul>

        {/* Mobile Menu (Visible when isOpen is true) */}
        {isOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 md:mt-0 bg-gray-300 rounded-sm py-2">
            <li><a href="/" className="hover:underline text-lg hover:text-blue-700 font-semibold">Home</a></li>
            <li><a href="#About" className="hover:underline text-lg hover:text-blue-700 font-semibold" onClick={toggleMenu}>About</a></li>
            <li><a href="#Features" className="hover:underline text-lg hover:text-blue-700 font-semibold" onClick={toggleMenu}>Features</a></li>
            <li><a href="#" className="hover:underline text-lg hover:text-blue-700 font-semibold" onClick={toggleMenu}>Contact</a></li>
            <li><Logindia value={false} /></li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
