import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token"); // check if user is logged in
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user info

  if (!token) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // role is restricted → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // user is logged in and allowed
  return children;
};

export default ProtectedRoute;
