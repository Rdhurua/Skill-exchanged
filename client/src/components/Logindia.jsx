import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";


const Logindia = ({ value,handle}) => {
  const [isOpen, setOpen] = useState(value);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //for logout
  const [check, setCheck] = useState(false);
  const handlecheck = () => {
    setCheck(!check);
  }

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5900/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log("Server response:", result);

        if (response.ok) {
          Swal.fire({
            title: "Logged Out",
            text: "You have successfully logged out.",
            icon: "success",
          }).then(() => {
            navigate("/");
            handlecheck();
          });
        } else {
          console.log("Logout error:", result.message);
        }
      } else {
        console.error("Unexpected server response format.");
      }
    } catch (error) {
      console.error("Network error:", error);
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5900/users/login', {
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
          text: ` Welcome ${result.name},You have successfully logged in.`,
          icon: "success",
        }).then(() => {
          navigate("/");
          handleClose();
          handlecheck();
          // handle();
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
    <>
      <button
        onClick={check==true? handleLogout : handleOpen}
        className="block text-white md:text-blue-500 px-14 py-2  md:px-4  lg:px-3 lg:py-1 text-lg md:text-md font-semibold  hover:bg-blue-600 bg-blue-500 hover:text-white  md:bg-transparent text-nowrap"
        type="button"
      >
        {check==true ?"user-Logout" : "user-Log In"}
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
                      placeholder="name@company.com"
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
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="mt-2 w-full p-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-500 dark:placeholder-gray-400"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
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
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 shadow-lg transition-colors duration-200"
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
                  <Link to={"/CreateAccount"} className="text-blue-600 hover:underline dark:text-blue-500">CreateAccount</Link>
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
