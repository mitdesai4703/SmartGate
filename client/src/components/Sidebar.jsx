import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaTools,
  FaFileAlt,
  FaUserShield
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-5">
      
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-center">SmartGate</h3>
      </div>

    
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
              isActive ? "bg-gray-700" : ""
            }`
          }
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
        >
          <FaUserShield />
          <span>Admin Portal</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
