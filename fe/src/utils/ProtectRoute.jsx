import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const checkAuthToken = () => !!localStorage.getItem("token");

const getUserType = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const userType = decodedToken.userType;
    return userType;
  }
  return null;
};

export function ProtectRoute({ children }) {
  const location = useLocation();
  if (!checkAuthToken()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export const withRole = (Component, allowedTypes) => {
  return (props) => {
    const userType = getUserType();

    if (userType && allowedTypes.includes(userType)) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };
};