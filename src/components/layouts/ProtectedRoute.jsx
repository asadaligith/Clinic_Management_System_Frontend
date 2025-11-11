import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/userContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(userContext);
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
