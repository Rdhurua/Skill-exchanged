import React, { useState,useContext } from 'react';
import Logindia from "../../pages/Login.jsx";
import logo from "../../assets/fg.png";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="bg-[#ddeded] text-black p-4 sticky top-0 z-30 shadow-md shadow-black">
      <nav className="flex flex-col md:flex-row md:justify-between md:items-center max-w-7xl mx-auto">

        <div className="flex justify-between items-center w-full lg:w-auto ">
          <a href="/">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="logo" className="h-12 w-12 animate-spin-slow" />
              <h1 className="text-2xl font-bold">Skill-Exchange</h1>
            </div>
          </a>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none text-purple-600">

              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m0 6H4" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:space-x-4 md:mr-14 lg:space-x-6 items-center mt-4 md:mt-0">
          <li><a href="/" className="hover:underline text-lg hover:text-black font-semibold">Home</a></li>
          <li><a href="#About" className="hover:underline text-lg hover:text-black font-semibold">About</a></li>
          <li><a href="#Features" className="hover:underline text-lg hover:text-black font-semibold">Features</a></li>
          <li><a href="#" className="hover:underline text-lg hover:text-black font-semibold">Contact</a></li>
          <li className="relative">
        <button
          onClick={toggleDropdown}
          className=" text-lg bg-purple-400 hover:bg-purple-500 shadow-sm shadow-black py-1 px-3 rounded-lg text-white font-semibold focus:outline-none"
        >
          Login
        </button>
        {dropdownOpen && (
          <ul className="absolute left-0 mt-2 bg-gray-200 rounded-md shadow-lg py-6 px-4">
            <li>
              <Link to={"/AdminLogin"} className="block px-4 py-1 text-lg font-semibold hover:bg-purple-600 hover:text-white ">Admin</Link>
            </li>
              <div className='w-full h-[0.5px] bg-black'></div>
            <li><Logindia value={false} handle={toggleDropdown} /></li>
          </ul>
        )}
      </li>

        </ul>

        {/* Mobile Menu (Visible when isOpen is true) */}
        {isOpen && (
  <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 md:mt-0 bg-gray-300 rounded-sm py-2">
    <li>
      <a href="/" className="hover:underline text-lg hover:text-black font-semibold">
        Home
      </a>
    </li>
    <li>
      <a href="#About" className="hover:underline text-lg hover:text-black font-semibold" onClick={toggleMenu}>
        About
      </a>
    </li>
    <li>
      <a href="#Features" className="hover:underline text-lg hover:text-black font-semibold" onClick={toggleMenu}>
        Features
      </a>
    </li>
    <li>
      <a href="#" className="hover:underline text-lg hover:text-black font-semibold" onClick={toggleMenu}>
        Contact
      </a>
    </li>

    {/* New Login Dropdown */}
    <li className="relative">
      <button
        onClick={toggleDropdown}
        className="text-lg bg-purple-600 py-1 px-3 rounded-lg text-white font-semibold focus:outline-none"
      >
        Login
      </button>
      {dropdownOpen && (
        <ul className="absolute left-0 mt-2 bg-gray-200 rounded-md shadow-lg py-2">
          <li>
            <Link to="/login" className="block px-4 py-2 hover:bg-purple-500 hover:text-white">
              Admin
            </Link>
          </li>
          <li>
            <Logindia value={false} handle={toggleDropdown} />
          </li>
        </ul>
      )}
    </li>
  </ul>
)}

      </nav>
    </div>
  );
};

export default Header;
