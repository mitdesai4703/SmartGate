import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaTools,
  FaFileAlt,
  FaMoneyBillWave,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";

const DashboardCard = ({ title, value, description, icon, color }) => (
  <div className="flex flex-col justify-between bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className="text-4xl text-gray-400">{icon}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [maintenanceTickets, setMaintenanceTickets] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [amountDue, setAmountDue] = useState({ amount: 0, dueDate: "" });
  const [complaints, setComplaints] = useState([]);

 
const fetchVisitors = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/visitors`);
    setVisitors(Array.isArray(res.data) ? res.data : res.data.data || []);
  } catch (err) {
    console.error("Error fetching visitors:", err);
    setVisitors([]); 
  }
};


const fetchMaintenance = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/maintenance`);
    setMaintenanceTickets(Array.isArray(res.data) ? res.data : res.data.data || []);
  } catch (err) {
    console.error("Error fetching maintenance tickets:", err);
    setMaintenanceTickets([]);
  }
};


const fetchDocuments = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/documents`);
    setDocuments(Array.isArray(res.data) ? res.data : res.data.data || []);
  } catch (err) {
    console.error("Error fetching documents:", err);
    setDocuments([]);
  }
};


const fetchAmountDue = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/payments/due`);
    setAmountDue(res.data || { amount: 0, dueDate: "" });
  } catch (err) {
    console.error("Error fetching amount due:", err);
    setAmountDue({ amount: 0, dueDate: "" });
  }
};


const fetchComplaints = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/complaints`);
    setComplaints(Array.isArray(res.data) ? res.data : res.data.data || []);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    setComplaints([]);
  }
};


  useEffect(() => {
    fetchVisitors();
    fetchMaintenance();
    fetchDocuments();
    fetchAmountDue();
    fetchComplaints();
  }, []);

  const visitorsToday = visitors.filter((v) => {
    const date = new Date(v.entryTime);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }).length;

  const pendingTickets = maintenanceTickets.filter((t) => !t.completed);
  const dueDateFormatted = amountDue?.dueDate
    ? new Date(amountDue.dueDate).toLocaleDateString()
    : "—";

  const pendingComplaints = complaints.filter((c) => c.status !== "Resolved");

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <DashboardCard
          title="Total Visitors"
          value={visitorsToday}
          description="Visitors entered today"
          icon={<FaUsers className="text-blue-500" />}
          color="text-blue-600"
        />
        <DashboardCard
          title="Maintenance Tickets"
          value={pendingTickets.length}
          description="Pending tickets to resolve"
          icon={<FaTools className="text-orange-500" />}
          color="text-orange-600"
        />
        <DashboardCard
          title="Documents"
          value={documents.length}
          description="Total uploaded documents"
          icon={<FaFileAlt className="text-green-500" />}
          color="text-green-600"
        />
        <DashboardCard
          title="Amount Due"
          value={`₹${amountDue?.amount ? amountDue.amount.toLocaleString() : 0}`}

          description={`Due Date: ${dueDateFormatted}`}
          icon={<FaMoneyBillWave className="text-red-500" />}
          color="text-red-600"
        />
        <DashboardCard
          title="User Complaints"
          value={pendingComplaints.length}
          description="Pending complaints"
          icon={<FaExclamationCircle className="text-purple-500" />}
          color="text-purple-600"
        />
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Visitors</h2>
          {visitors.length === 0 ? (
            <p className="text-gray-500">No visitors logged yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {visitors
                .sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime))
                .slice(0, 5)
                .map((v) => (
                  <li key={v._id} className="flex flex-col sm:flex-row justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-700">{v.name}</p>
                      <p className="text-gray-500 text-sm">{v.resident} | House {v.houseNo}</p>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 sm:mt-0">{new Date(v.entryTime).toLocaleString()}</p>
                  </li>
                ))}
            </ul>
          )}
        </div>

       
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Maintenance</h2>
          {pendingTickets.length === 0 ? (
            <p className="text-gray-500">No pending maintenance tasks.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {pendingTickets.slice(0, 5).map((t, i) => (
                <li key={i} className="flex flex-col sm:flex-row justify-between py-2">
                 <p className="text-gray-700"> {t.user?.name}</p>

                  <p className="text-gray-500 text-sm mt-1 sm:mt-0 flex items-center">
                    <FaClock className="inline mr-1" />
                    {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Complaints</h2>
          {pendingComplaints.length === 0 ? (
            <p className="text-gray-500">No pending complaints.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {pendingComplaints.slice(0, 5).map((c, i) => (
                <li key={i} className="flex flex-col py-2">
                  <p className="text-gray-700">{c.message}</p>
                  <p className="text-sm text-gray-500">
                    User: {c.userName} | Status: <span className={c.status === "Resolved" ? "text-green-600" : "text-red-500"}>{c.status}</span>
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
