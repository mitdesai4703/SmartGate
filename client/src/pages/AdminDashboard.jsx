import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaTools, FaFileAlt, FaClock } from "react-icons/fa";

const DashboardCard = ({ title, value, icon, description, bgColor }) => (
  <div
    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl shadow-md ${bgColor} transition-all`}
  >
    <div className="mb-4 sm:mb-0">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
    <div className="text-4xl sm:ml-4 self-end sm:self-auto">{icon}</div>
  </div>
);

const AdminDashboard = () => {
  const [visitorsToday, setVisitorsToday] = useState(0);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [pendingMaintenance, setPendingMaintenance] = useState([]);
  const [documentsCount, setDocumentsCount] = useState(0);

  const fetchVisitors = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/visitors`
      );
      const visitors = res.data;
      const today = new Date();
      const countToday = visitors.filter((v) => {
        const entryDate = new Date(v.entryTime);
        return (
          entryDate.getDate() === today.getDate() &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        );
      }).length;
      setVisitorsToday(countToday);

      const lastVisitors = visitors
        .sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime))
        .slice(0, 5);
      setRecentVisitors(lastVisitors);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMaintenance = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/maintenance`
      );
      const tasks = res.data;
      const pendingTasks = tasks.filter((t) => !t.completed);
      setPendingMaintenance(pendingTasks.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/documents`
      );
      setDocumentsCount(res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchMaintenance();
    fetchDocuments();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <DashboardCard
          title="Visitors Today"
          value={visitorsToday}
          description="Total visitors entered today"
          icon={<FaUsers className="text-green-500" />}
          bgColor="bg-white"
        />
        <DashboardCard
          title="Pending Maintenance"
          value={pendingMaintenance.length}
          description="Maintenance tasks pending"
          icon={<FaTools className="text-orange-500" />}
          bgColor="bg-white"
        />
        <DashboardCard
          title="Documents Uploaded"
          value={documentsCount}
          description="Total documents uploaded"
          icon={<FaFileAlt className="text-blue-500" />}
          bgColor="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Recent Visitors
          </h2>
          {recentVisitors.length === 0 ? (
            <p className="text-gray-500">No visitors logged yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recentVisitors.map((v) => (
                <li key={v._id} className="flex flex-col sm:flex-row justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-700">{v.name}</p>
                    <p className="text-gray-500 text-sm">
                      {v.resident} | House {v.houseNo}
                    </p>
                  </div>
                  <div className="text-gray-500 text-sm mt-1 sm:mt-0">
                    {new Date(v.entryTime).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Pending Maintenance
          </h2>
          {pendingMaintenance.length === 0 ? (
            <p className="text-gray-500">No pending maintenance tasks.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {pendingMaintenance.map((t, index) => (
                <li key={index} className="flex flex-col sm:flex-row justify-between py-2">
                  <p className="text-gray-700">{t.task || t.name}</p>
                  <p className="text-gray-500 text-sm mt-1 sm:mt-0 flex items-center">
                    <FaClock className="inline mr-1" />
                    {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
