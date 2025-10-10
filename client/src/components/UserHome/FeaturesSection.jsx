import React from "react";
import { FaUsers, FaTools, FaFileAlt, FaUserShield } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaUsers className="text-3xl text-green-400 mb-4" />,
      title: "Visitor Management",
      desc: "Track and manage visitors efficiently with check-in/check-out features.",
    },
    {
      icon: <FaTools className="text-3xl text-green-400 mb-4" />,
      title: "Maintenance Tracking",
      desc: "Keep track of maintenance requests and their status easily.",
    },
    {
      icon: <FaFileAlt className="text-3xl text-green-400 mb-4" />,
      title: "Document Management",
      desc: "Manage all your society documents and files in one place.",
    },
    {
      icon: <FaUserShield className="text-3xl text-green-400 mb-4" />,
      title: "Admin Portal",
      desc: "Secure admin controls for managing residents and security.",
    },
  ];

  return (
    <section className="py-20 bg-white px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, index) => (
          <div key={index} className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            {f.icon}
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
