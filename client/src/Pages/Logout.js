import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authToken or any other stored authentication data
    localStorage.removeItem("authToken");

    // Optionally, clear other user data if stored
    // localStorage.removeItem("userProfile");

    // Redirect the user to the login page
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Logging you out...
        </h1>
      </div>
    </div>
  );
};

export default Logout;
