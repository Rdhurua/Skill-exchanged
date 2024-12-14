import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
  
    // alert("your session is expired , you have to login again");
   
    return <Navigate to="/session" replace />;
  }

  return children;
};

export default ProtectedRoute;
