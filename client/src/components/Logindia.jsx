import React, { useState } from 'react';

 const Logindia = ({ value }) => {
  const [isOpen, setOpen] = useState(value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="block text-white px-14 py-2 lg:px-3 lg:py-1 text-lg md:text-md font-medium hover:bg-blue-600 bg-blue-500 rounded"
        type="button"
      >
        Log In
      </button>

      {isOpen && (
       <div
       id="authentication-modal"
       tabIndex="-1"
       aria-hidden="true"
       className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-60 px-4 sm:px-0"
     >
       <div className="relative p-4 w-full max-w-lg max-h-full">
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
             <form className="space-y-6" action="#">
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
                   required
                 />
               </div>
     
               {/* Remember Me & Forgot Password */}
               <div className="flex justify-between items-center">
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
               </div>
     
               {/* Submit Button */}
               <button
                 type="submit"
                 className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 shadow-lg transition-colors duration-200"
               >
                 Login to your account
               </button>
     
               {/* Register Link */}
               <p className="text-sm font-medium text-gray-500 text-center">
                 Not registered?{' '}
                 <a
                   href="#"
                   className="text-blue-600 hover:underline dark:text-blue-500"
                 >
                   Create account
                 </a>
               </p>
             </form>
           </div>
         </div>
       </div>
     </div>
     
      )}
    </>
  );
};

export default Logindia;
