import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col justify-center items-center text-center bg-gradient-to-br from-green-100 via-white to-green-200 flex-1 px-4 py-32">
      <h1 className="text-5xl md:text-6xl font-bold text-[#003B2F] mb-6">
        Welcome to <span className="text-[#00996D]">SmartGate</span>
      </h1>
      <p className="text-gray-600 mb-10 text-lg md:text-xl max-w-2xl">
        Manage your society visitors, residents, and security all in one platform.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-[#00996D] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#007F5A] transition-all duration-200"
      >
        Get Started
      </button>
    </header>
  );
};

export default HeroSection;
