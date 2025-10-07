import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center h-20 px-6 bg-gray-800 shadow-md">
     
      <div className="flex items-center gap-2 text-green-400 font-semibold text-lg">
        <FaUserCircle className="text-2xl" />
        <span>Welcome to SmartGate</span>
      </div>

   
      <button
        onClick={handleLogout}
        className="bg-green-400 hover:bg-green-300 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
