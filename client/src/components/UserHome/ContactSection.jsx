import React from "react";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-green-50 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Get Started?</h2>
      <p className="text-gray-700 mb-8 max-w-lg mx-auto">
        Join SmartGate today and make society management simple and secure.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-[#00996D] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#007F5A] transition-all duration-200"
      >
        Login Now
      </button>
    </section>
  );
};

export default ContactSection;
