import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaTools,
  FaFileAlt,
  FaUserShield,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h3 className="text-xl font-bold">SmartGate</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white p-5 
          w-64 md:w-64 z-50 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Logo */}
        <div className="mb-10 md:block hidden">
          <h3 className="text-2xl font-bold text-center">SmartGate</h3>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/visitor-management"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaUsers />
            <span>Visitor Management</span>
          </NavLink>

          <NavLink
            to="/maintenance"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaTools />
            <span>Maintenance</span>
          </NavLink>

          <NavLink
            to="/documents"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaFileAlt />
            <span>Documents</span>
          </NavLink>

          <NavLink
            to="/admin-portal"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaUserShield />
            <span>Admin Portal</span>
          </NavLink>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
