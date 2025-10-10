import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🧹 Clear stored data (adjust as needed)
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // 🔁 Redirect to home (login) page
    navigate("/");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <header className="flex justify-between items-center bg-[#0f172a] text-white px-6 py-4 shadow">
          <h1 className="text-lg font-semibold">
            Welcome to <span className="text-green-400">SmartGate</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
