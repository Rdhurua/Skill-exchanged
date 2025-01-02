import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  if (!authUser) {
   
    return <Navigate to="/session" replace />;
  }

  return children;
};

export default ProtectedRoute;
