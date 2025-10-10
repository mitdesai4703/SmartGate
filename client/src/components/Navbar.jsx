import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { logout } = useAppContext(); 
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Left section */}
          <div className="flex items-center gap-2 text-green-400 font-semibold text-lg">
            <FaUserCircle className="text-2xl" />
            <span className="hidden sm:inline">Welcome to SmartGate</span>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-green-400 focus:outline-none"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Right section (desktop) */}
          <div className="hidden sm:flex sm:items-center">
            <button
              onClick={handleLogout}
              className="bg-green-400 hover:bg-green-300 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full text-left bg-green-400 hover:bg-green-300 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
