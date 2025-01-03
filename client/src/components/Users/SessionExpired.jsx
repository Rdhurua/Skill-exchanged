import React from 'react'

const SessionExpired = () => {
    const handleLoginRedirect = () => {
        // Redirect to login page
        window.location.href = '/login';
      };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg w-[93%] md:w-[65%] h-auto">
        <h1 className="text-2xl font-bold text-red-500 mb-4">You have been logged out</h1>
        <div className='flex justify-center items-center '>

        <p className="text-gray-700 mb-6 text-lg font-semibold text-pretty px-4">
          we notice that you aren't in this session,so we logged you out for your safety.Please click on the button to log in again.
        </p>
        </div>
        <button
          onClick={handleLoginRedirect}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}

export default SessionExpired
