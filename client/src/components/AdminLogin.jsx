import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateAccountForm from './SignUp';
 import Swal from 'sweetalert2';
const AdminLogin = () => {
  
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
          const response = await fetch('http://localhost:5900/admins/login', {
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
    <div className="w-full max-w-lg h-[60vh]  bg-white rounded-lg shadow-lg p-8">
     
  
      {/* Form */}
      <form className="space-y-8" onSubmit={handleSubmit} >
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="name@company.com"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
  
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Your password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg py-3 transition-colors duration-200"
        >
          Login to your account
        </button>
      </form>
  
      {/* Register Link */}
      <p className="text-sm font-medium text-gray-500 text-center mt-4">
        Don't have an account?{' '}
        <Link to="/AdminRegister" className="text-blue-600 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  </div>
  
  )
}

export default AdminLogin
