import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Maintenance = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    amount: "",
    dueDate: "",
    description: "",
  });

 
const fetchTickets = async () => {
  try {
    const res = await axios.get("/api/maintenance");

  
    console.log("Fetched tickets response:", res.data);

    
    const data = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.data)
      ? res.data.data
      : [];

    setTickets(data);
  } catch (err) {
    console.error("Error fetching maintenance tickets:", err);
    setTickets([]); 
  }
};



  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/user/all");
      if (res.data.success)
        setUsers(res.data.users.filter((u) => u.email !== "admin@gmail.com"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return toast.error("Select a user");

    try {
      await axios.post("/api/maintenance", {
        userName: selectedUser.name,
        ...form,
      });
      toast.success("Ticket created");
      setForm({ amount: "", dueDate: "", description: "" });
      setSelectedUser(null);
      fetchTickets();
    } catch (err) {
      console.error(err);
      toast.error("Error creating ticket");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/maintenance/${id}`);
      toast.success("Deleted successfully");
      fetchTickets();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/api/maintenance/${id}`, { status });
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-6">Admin Maintenance</h1>

      <div className="flex flex-col lg:flex-row gap-6">
    
        <div className="lg:w-1/4 bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[500px]">
          <h2 className="text-lg font-semibold mb-4 text-green-700">Users</h2>
          <ul className="space-y-2">
            {users.map((u) => (
              <li
                key={u._id}
                onClick={() => setSelectedUser(u)}
                className={`cursor-pointer p-3 rounded-lg border transition-all ${
                  selectedUser?._id === u._id
                    ? "bg-green-600 text-white border-green-700"
                    : "bg-gray-100 hover:bg-green-100 border-gray-200"
                }`}
              >
                <p className="font-medium">{u.name}</p>
                <p className="text-sm">{u.email}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-3/4 flex flex-col gap-6">
         
          {selectedUser && (
            <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
              <p>
                <strong>Selected User:</strong> {selectedUser.name}
              </p>
            </div>
          )}

         
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-green-700">Create Ticket</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Create Ticket
              </button>
            </form>
          </div>

         
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((t) => (
                  <tr key={t._id} className="hover:bg-green-50 transition-colors">
                    <td className="px-4 py-2">{t.user.name}</td>
                    <td className="px-4 py-2">{t.amount}</td>
                    <td className="px-4 py-2">{new Date(t.dueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <select
                        value={t.status}
                        onChange={(e) => handleStatusChange(t._id, e.target.value)}
                        className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
