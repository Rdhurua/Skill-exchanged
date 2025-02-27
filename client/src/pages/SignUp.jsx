// src/components/CreateAccountForm.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { BsEyeSlashFill } from "react-icons/bs";
import axios from 'axios'
const CreateAccountForm = () => {
  const navigate = useNavigate();
  const [shown,setShown]=useState(false);
  const handleShown=()=>setShown(!shown);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {

        console.log('Account created:', result);
        Swal.fire({
          title: "Wow",
          text: "you have successfuly registered",
          icon: "success"
        }).then(() => {
          navigate("/login");
        })
        setFormData({
          name: "",
          password: "",
          email: "",
          confirmPassword: "",
          role: "",
        });

      } else {
        // Handle error
        console.log('Error:', result.message);
        alert('Error creating account:', result.message);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4ItnHpJivB6Xyu0_DQnY43uFV1cNKc7TaA&s"
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white bg-opacity-90 p-8 rounded-e-md  max-w-xl w-full z-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="name"
                id="username"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className='flex justify-between items-center'>
              <input
                type={shown?"text":"password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 w-[98%] p-2  border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
              />{shown?<BsEyeSlashFill className='text-2xl ml-2' onClick={handleShown} />:< FaEye className='text-2xl ml-2' onClick={handleShown} />}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <div className='flex justify-between items-center'>
              <input
                type={shown?"text":"password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="off"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm your password"
              />{shown?<BsEyeSlashFill className='text-2xl ml-2' onClick={handleShown} />:< FaEye className='text-2xl ml-2' onClick={handleShown} />}
              </div>
            </div>


            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                what role you preffer
              </label>
              <select value={formData.role} onChange={handleChange} id="role" name="role" required autoComplete="off"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select role</option>
                <option value="learner">learner</option>
                <option value="provider">provider</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>


  );
};

export default CreateAccountForm;
