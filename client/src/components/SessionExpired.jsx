import React from 'react'

const SessionExpired = () => {
    const handleLoginRedirect = () => {
        // Redirect to login page
        window.location.href = '/login';
      };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Session Expired</h1>
        <p className="text-gray-700 mb-6">
          Your session has expired. Please log in again to continue.
        </p>
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
