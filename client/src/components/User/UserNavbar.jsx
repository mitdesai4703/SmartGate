import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTools,
  FaFileAlt,
  FaUserShield
} from "react-icons/fa";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Maintenance", path: "/user-maintenance", icon: <FaTools /> },
    { name: "Documents", path: "/user-documents", icon: <FaFileAlt /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div
            className="text-green-400 font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            SmartGate
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="flex items-center gap-1 hover:text-green-400 transition-colors font-medium"
              >
                {link.icon && <span>{link.icon}</span>} {link.name}
              </button>
            ))}

            {/* Admin Login Button */}
            <button
              onClick={() => navigate("/admin/login")}
              className="flex items-center gap-1 hover:text-green-400 transition-colors font-medium"
            >
              <FaUserShield /> Admin
            </button>

            {/* User Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="bg-green-400 hover:bg-green-300 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              {link.icon} {link.name}
            </button>
          ))}

          {/* Admin Login (Mobile) */}
          <button
            onClick={() => {
              navigate("/admin/login");
              setMenuOpen(false);
            }}
            className="w-full text-left flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            <FaUserShield /> Admin
          </button>

          {/* User Login (Mobile) */}
          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="w-full text-left bg-green-400 hover:bg-green-300 text-gray-900 font-semibold px-4 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
