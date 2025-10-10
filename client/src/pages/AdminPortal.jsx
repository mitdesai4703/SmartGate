import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsersCog, FaHome, FaFileAlt, FaComments } from "react-icons/fa";

const modules = [
  {
    title: "Residents",
    description: "Manage resident profiles, verify users, and handle resident data efficiently.",
    icon: <FaUsersCog className="text-blue-500 text-4xl" />,
    path: "/residents",
    button: "Manage Residents",
  },
  {
    title: "House Records",
    description: "Oversee property details, unit allocations, and ownership/tenancy records in the system.",
    icon: <FaHome className="text-blue-500 text-4xl" />,
    path: "/houses",
    button: "Manage House Records",
  },
  {
    title: "Document Control",
    description: "Manage document categories, upload permissions, and archival policies with ease.",
    icon: <FaFileAlt className="text-blue-500 text-4xl" />,
    path: "/documents",
    button: "Manage Document Control",
  },
  {
    title: "Complaints",
    description: "Track and manage resident complaints and maintenance requests efficiently.",
    icon: <FaComments className="text-blue-500 text-4xl" />,
    path: "/maintenance",
    button: "Manage Complaints",
  },
];

const AdminPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">
        Nexus Community Admin Portal
      </h1>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
        Oversee and manage all aspects of the Nexus Community application, including residents, house records, documents, and complaints. Click any card below to manage specific sections.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {modules.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-6 sm:p-8 border border-gray-200 flex flex-col justify-between hover:scale-105 transform"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4 sm:mb-6">
              {item.icon}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4 sm:mt-0">
                {item.title}
              </h2>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-4 sm:mb-6">
              {item.description}
            </p>

            <button
              onClick={() => navigate(item.path)}
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-base transition-colors shadow-md hover:shadow-lg w-full sm:w-auto text-center"
            >
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortal;
