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
      const response = await fetch("https://skill-exchanged.onrender.com/users/auth/validate", {
        method: "GET",
        credentials: "include", // Include cookies for authentication
      });

      if (response.ok) {
        console.log("Session is valid.");
        setIsAuthenticated(true);
      } else if (response.status === 401) {
        console.warn("Session invalid or expired.");
        setIsAuthenticated(false);
      } else {
        console.error("Unexpected response during session validation:", response);
      }
    } catch (error) {
      console.error("Error during session validation:", error);
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
