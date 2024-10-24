// src/components/CreateAccountForm.jsx
import React, { useState } from 'react';

const CreateAccountForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5900/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Send the form data as JSON
      });

      const result = await response.json();
      
      if (response.ok) {
        // Handle success (e.g., redirect, show a success message)
        console.log('Account created:', result);
        alert('Account created successfully!');
        setFormData({
           name:"",
           password:"",
           email:"",
           confirmPassword:"",
        })
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
      src="https://img.freepik.com/premium-photo/abstract-background-molecules-technology-with-polygonal-shapes_7247-1675.jpg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover -z-10"
    />
  
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-xl w-full z-20">
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
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="off"
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your password"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
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
