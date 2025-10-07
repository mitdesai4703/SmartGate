import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editResident, setEditResident] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    houseNo: "",
    unitType: "",
    verified: false,
  });

  
  const fetchResidents = async () => {
    try {
     const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/residents`);
      setResidents(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);


  const openModal = (resident = null) => {
    setEditResident(resident);
    setFormData(resident ? { ...resident } : {
      name: "",
      email: "",
      phone: "",
      houseNo: "",
      unitType: "",
      verified: false,
    });
    setModalOpen(true);
  };

 
  const closeModal = () => {
    setModalOpen(false);
    setEditResident(null);
  };

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editResident) {
        
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/residents/${editResident._id}`, formData);
        setResidents(residents.map(r => r._id === editResident._id ? res.data : r));
      } else {
        
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/residents`, formData);
        setResidents([res.data, ...residents]);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error saving resident");
    }
  };

  
  const deleteResident = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resident?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/residents/${id}`);
      setResidents(residents.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Residents</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          <FaPlus /> Add Resident
        </button>
      </div>

     
      <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Phone</th>
            <th className="py-3 px-4">House No</th>
            <th className="py-3 px-4">Unit Type</th>
            <th className="py-3 px-4">Verified</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((r) => (
            <tr key={r._id} className="border-b">
              <td className="py-2 px-4">{r.name}</td>
              <td className="py-2 px-4">{r.email}</td>
              <td className="py-2 px-4">{r.phone || "-"}</td>
              <td className="py-2 px-4">{r.houseNo}</td>
              <td className="py-2 px-4">{r.unitType || "-"}</td>
              <td className="py-2 px-4">{r.verified ? "Yes" : "No"}</td>
              <td className="py-2 px-4 flex gap-3">
                <button
                  onClick={() => openModal(r)}
                  className="text-blue-500 hover:text-blue-700"
                ><FaEdit /></button>
                <button
                  onClick={() => deleteResident(r._id)}
                  className="text-red-500 hover:text-red-700"
                ><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{editResident ? "Edit Resident" : "Add Resident"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                name="houseNo"
                placeholder="House No"
                value={formData.houseNo}
                onChange={handleChange}
                required
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                name="unitType"
                placeholder="Unit Type"
                value={formData.unitType}
                onChange={handleChange}
                className="border rounded-lg p-2"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                Verified
              </label>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  {editResident ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Residents;
