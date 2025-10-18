import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTools,
  FaFileAlt,
  FaUserShield,
  FaSignOutAlt,
  FaBullhorn,
  FaEnvelope,
} from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

const UserNavbar = () => {
  const navigate = useNavigate();
  const { role } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Maintenance", path: "/user-maintenance", icon: <FaTools /> },
    { name: "Documents", path: "/user-documents", icon: <FaFileAlt /> },
    {
      name: "Announcements",
      path: "/user-announcements",
      icon: <FaBullhorn />,
    },
    { name: "Contact Us", path: "/contactus", icon: <FaEnvelope /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div
            className="text-green-400 font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            SmartGate
          </div>

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

            {(!user || user?.role === "admin") && (
              <button
                onClick={() => navigate("/admin/login")}
                className="flex items-center gap-1 hover:text-green-400 transition-colors font-medium"
              >
                <FaUserShield /> Admin
              </button>
            )}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-green-500 text-white font-semibold w-10 h-10 rounded-full flex items-center justify-center text-lg uppercase hover:bg-green-400 transition"
                >
                  {user.name?.charAt(0) || "U"}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="px-4 py-2 font-medium border-b">
                      {user.name || "User"}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-green-400 hover:bg-green-300 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            )}
          </div>

          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

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

          {(!user || user?.role === "admin") && (
            <button
              onClick={() => {
                navigate("/admin/login");
                setMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              <FaUserShield /> Admin
            </button>
          )}

          {user ? (
            <div className="border-t border-gray-700 pt-3">
              <div className="flex items-center gap-3 text-white px-4">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg uppercase">
                  {user.name?.charAt(0) || "U"}
                </div>
                <span>{user.name}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="w-full text-left bg-green-400 hover:bg-green-300 text-gray-900 font-semibold px-4 py-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
