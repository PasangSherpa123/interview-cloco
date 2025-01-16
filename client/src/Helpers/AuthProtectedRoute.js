import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      navigate("/login", { replace: true });
    }
  }, [authToken, navigate]);

  if (!authToken) {
    return null;
  }
  return children;
};

export default AuthProtectedRoute;
