import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {useAuthContext} from "../Authroute/AuthContext.jsx"
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { BsEyeSlashFill } from "react-icons/bs";
import axios from 'axios'
import {showToastMessage,showToastMessage2} from "../utils/Toasting.js"
import useConversation from '../zustand/useConversation.js';

const Logindia = ({ value,handle}) => {
  const [isOpen, setOpen] = useState(value);
  const navigate = useNavigate();
   const [shown,setShown]=useState(false);

  const { authUser,setAuthUser } = useAuthContext();
   const {setLoggedId,setMe}=useConversation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const handleShown=()=>setShown(!shown);
  //for logout
  const [check, setCheck] = useState(false);
  const handlecheck = () => {
    setCheck(!check);
  }

  

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        method: "POST",
      headers:{'Content-Type':"application/json"}
      });

      const data = await response.json();
      if(data.error){
         throw new Error(data.error);
      }
      localStorage.removeItem("skill-exchange-user",JSON.stringify(data));
      setAuthUser(null);
      setMe(null);
      showToastMessage("successfully logout!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
    }
    catch(error){
           showToastMessage2(error.message);
    }
  };



  //login working start here
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goToProfile = async (userId) => {
    //  console.log("running");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          'Content-Type': 'application/json', 
        },
        withCredentials: true,
      });
  
      const userdata = response.data.user; 
     navigate(`/userProfile/${userdata._id}`);
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data || error.message);
    }
  };


  

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      formData, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      }
    );

    const result = response.data;
      // console.log(result);
      setLoggedId(result._id);
      localStorage.setItem("skill-exchange-user",JSON.stringify(result));
      setAuthUser(result);
      setMe(result.profilePicture);
      

      Swal.fire({
        text: `${result.message}`,
        icon: "success",
      }).then(() => {
        goToProfile(result._id);
        handleClose();
        handlecheck();
      });
      
      setFormData({
        email: "",
        password: "",
      });
    
  } catch (error) {
    console.error('Error during submission:', error);
    Swal.fire({
      title: "Login Failed",
      text: error.response.data.error,
      icon: "error",
    });
  }
};

  return (
    <>
      <button
        onClick={check==true? handleLogout : handleOpen}
        className="block  px-14 py-2  md:px-4  lg:px-3 lg:py-1 text-lg md:text-md font-semibold  hover:bg-purple-700  hover:text-white  md:bg-transparent text-nowrap"
        type="button"
      >
        {check==true ?"userLogout" : "userLogIn"}
      </button>

      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-60 px-4 sm:px-0"
        >
          <div className="relative p-4 w-full max-w-xl max-h-xl">
            <div className="relative bg-white rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t">
                <h3 className="text-2xl font-bold text-gray-900">
                  Sign in to our platform
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-2 w-full p-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-500 dark:placeholder-gray-400"
                      placeholder="name@gmail.com"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your password
                    </label>
                     <div className='flex justify-between items-center'>
                    <input
                      type={shown?"text":"password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="mt-2 w-[85%] p-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-500 dark:placeholder-gray-400"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    /> {shown?<BsEyeSlashFill className='text-2xl mr-4' onClick={handleShown} />:< FaEye className='text-2xl mr-4' onClick={handleShown} />}
                     </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  {/* <div className="flex justify-between items-center">
                 <div className="flex items-center">
                   <input
                     id="remember"
                     type="checkbox"
                     className="w-4 h-4 text-blue-600 bg-white border border-gray-300 rounded focus:ring-3 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-800"
                   />
                   <label
                     htmlFor="remember"
                     className="ml-2 text-sm font-medium text-gray-900"
                   >
                     Remember me
                   </label>
                 </div>
                 <a
                   href="#"
                   className="text-sm text-blue-600 hover:underline dark:text-blue-500"
                 >
                   Forgot Password?
                 </a>
               </div> */}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-3 shadow-lg transition-colors duration-200"
                  >
                    Login to your account
                  </button>

                  {/* Register Link */}
                </form>
                <p className="text-sm font-medium text-gray-500 text-center">
                  Don't have account?{' '}
                  {/* <a
                   href="/CreateAccount"
                   className="text-blue-600 hover:underline dark:text-blue-500"
                 >
                   Create account
                 </a> */}
                  <Link to={"/CreateAccount"} className="text-purple-600 hover:underline dark:text-purple-500">CreateAccount</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default Logindia;
