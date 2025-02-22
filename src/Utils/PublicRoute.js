import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const PublicRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  let location = useLocation();
 
  if (isAuthenticated === true && currentUser) {
    return (
      <Navigate
        to={`${currentUser.user_type}/dashboard`}
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};

export default PublicRoute;
