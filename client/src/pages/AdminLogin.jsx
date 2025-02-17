import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateAccountForm from './SignUp';
import { FaEye } from "react-icons/fa";
import { BsEyeSlashFill } from "react-icons/bs";
 import Swal from 'sweetalert2';
 import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
  
    const [isOpen, setOpen] = useState(false);
    const [shown,setShown]=useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleShown=()=>setShown(!shown);
      const navigate=useNavigate();
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


      //login admin
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
          });
    
          const result = await response.json();
          // console.log('Server response:', result);
    
          if (response.ok) {
    
            Swal.fire({
              title: "Wow!",
              text: ` Welcome Admin ${result.name},You have successfully logged in.`,
              icon: "success",
            });
              navigate("/adminDashboard");
    
            setFormData({
              email: "",
              password: "",
            });
    
          } else {
    
            console.log('Error:', result.message);
            Swal.fire({
              title: "Login Failed",
              text: result.message || "An error occurred during login.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error('Error during submission:', error);
          Swal.fire({
            title: "Network Error",
            text: "There was a problem connecting to the server.",
            icon: "error",
          });
        }
    
      };

  return (
    <div className="flex justify-center items-center md:flex-col min-h-screen px-4 sm:px-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-4xl font-bold text-gray-900">Welcome Admin,Do Log In</h3>
       
      </div>
    <div className="w-full max-w-lg h-[60vh]  bg-white rounded-lg shadow-lg p-16">
     
      <form className="space-y-8" onSubmit={handleSubmit} >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="admin@gmail.com"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
  
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter password</label>
          <div className='flex justify-between items-center'>
          <input
            type={shown?"text":"password"}
            name="password"
            id="password"
            className="mt-2 w-[98%] p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            onChange={handleChange}
            value={formData.password}
            required
          />{shown?<BsEyeSlashFill className='text-2xl ml-2' onClick={handleShown} />:< FaEye className='text-2xl ml-2' onClick={handleShown}/>}
          </div>
        </div>
  
        <button
          type="submit"
          className="w-full text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg py-3 transition-colors duration-200"
        >
          Login to your account
        </button>
      </form>
      {/* <p className="text-sm font-medium text-gray-500 text-center mt-4">
        Don't have an account?{' '}
        <Link to="/AdminRegister" className="text-purple-600 hover:underline">
          Create account
        </Link>
      </p> */}
    </div>
  </div>
  
  )
}

export default AdminLogin
