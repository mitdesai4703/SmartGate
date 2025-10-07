import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaTimes, FaTrashAlt, FaSignOutAlt } from "react-icons/fa";

const VisitorManagement = () => {
  const [visitors, setVisitors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    resident: "",
    houseNo: "",
    contactNumber: "",
    noOfPersons: 1,
    purpose: "",
    remarks: "",
  });
  const [search, setSearch] = useState("");

  const fetchVisitors = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/visitors`);
      setVisitors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/visitors`, formData);
      setFormData({
        name: "",
        resident: "",
        houseNo: "",
        contactNumber: "",
        noOfPersons: 1,
        purpose: "",
        remarks: "",
      });
      setShowModal(false);
      fetchVisitors();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/visitors/${id}/status`, { status });
      fetchVisitors();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteVisitor = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/visitors/${id}`);
      fetchVisitors();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredVisitors = visitors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.resident.toLowerCase().includes(search.toLowerCase()) ||
      v.houseNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
     
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Visitor Management</h1>

      
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
          <input
            type="text"
            placeholder=" Search visitors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
          >
            <FaUserPlus /> Log New Visitor
          </button>
        </div>
      </div>

     
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Resident",
                "House No",
                "Contact",
                "Persons",
                "Purpose",
                "Remarks",
                "Entry",
                "Exit",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredVisitors.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  className="text-center text-gray-500 py-10 text-lg"
                >
                  No visitors found.
                </td>
              </tr>
            ) : (
              filteredVisitors.map((v) => (
                <tr
                  key={v._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-2 text-gray-800">{v.name}</td>
                  <td className="px-4 py-2">{v.resident}</td>
                  <td className="px-4 py-2">{v.houseNo}</td>
                  <td className="px-4 py-2">{v.contactNumber || "-"}</td>
                  <td className="px-4 py-2">{v.noOfPersons}</td>
                  <td className="px-4 py-2">{v.purpose || "-"}</td>
                  <td className="px-4 py-2">{v.remarks || "-"}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(v.entryTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {v.exitTime ? new Date(v.exitTime).toLocaleString() : "-"}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      v.status === "Checked In"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {v.status}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {v.status === "Checked In" && (
                      <button
                        onClick={() => updateStatus(v._id, "Checked Out")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <FaSignOutAlt /> Check Out
                      </button>
                    )}
                    <button
                      onClick={() => deleteVisitor(v._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Log New Visitor
              </h2>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Visitor Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <input
                  type="text"
                  name="resident"
                  placeholder="Resident Name"
                  value={formData.resident}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <input
                  type="text"
                  name="houseNo"
                  placeholder="House No"
                  value={formData.houseNo}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <input
                  type="number"
                  name="noOfPersons"
                  placeholder="Number of Persons"
                  value={formData.noOfPersons}
                  onChange={handleChange}
                  min="1"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <input
                  type="text"
                  name="purpose"
                  placeholder="Purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <textarea
                  name="remarks"
                  placeholder="Remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Save Visitor
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitorManagement;
