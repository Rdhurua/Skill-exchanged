import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization state

  const hasAuthToken = () => {
    // Check if the `authToken` cookie exists
    const cookies = document.cookie.split("; ");
    return cookies.some((cookie) => cookie.startsWith("authToken="));
  };

  const validateSession = async () => {
    try {
      const response = await axios.get("https://skill-exchange-server.onrender.com/users/auth/validate", {
        withCredentials: true, // Include cookies for authentication
      });
  
      // Check the response status
      if (response.status === 200) {
        console.log("Session is valid.");
        setIsAuthenticated(true);
      }
    } catch (error) {
      // Handle session invalidation or other errors
      if (error.response?.status === 401) {
        console.warn("Session invalid or expired.");
        setIsAuthenticated(false);
      } else {
        console.error("Error during session validation:", error.response || error.message);
      }
    } finally {
      setIsInitialized(true); // Mark initialization complete
    }
  };
  
  useEffect(() => {
    if (hasAuthToken()) {
      // Only validate the session if the auth token exists
      validateSession();
    } else {
      console.log("No auth token found. Skipping validation.");
      setIsInitialized(true); // Directly mark initialization as complete
    }

    // Recheck session validity every minute if the user is authenticated
    const interval = setInterval(() => {
      if (isAuthenticated) {
        validateSession();
      }
    }, 60000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
    console.log("User logged in.");
  };

  const logout = () => {
    setIsAuthenticated(false);
    document.cookie = "authToken=; Max-Age=0; path=/;"; // Clear the cookie
    console.log("User logged out.");
  };

  if (!isInitialized) {
    // Show a loading state until session validation completes
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
