import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserMaintenance = () => {
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [userName, setUserName] = useState(null);

  const [complaints, setComplaints] = useState([]);
  const [complaintMsg, setComplaintMsg] = useState("");
  const [loadingComplaints, setLoadingComplaints] = useState(true);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
      
    }
  }, []);

  
  useEffect(() => {
    if (!userName) return;

    const fetchTickets = async () => {
      try {
        const res = await axios.get(`/api/maintenance?userName=${userName}`);
        setTickets(res.data);
      } catch (err) {
        console.error(err);
        setTickets([]);
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchTickets();
  }, [userName]);

 
  useEffect(() => {
    if (!userName) return;

    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`/api/complaints?userName=${userName}`);
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
        setComplaints([]);
      } finally {
        setLoadingComplaints(false);
      }
    };

    fetchComplaints();
  }, [userName]);

 
  const handleComplaintSubmit = async (e) => {
  e.preventDefault();
  if (!complaintMsg.trim()) return toast.error("Complaint cannot be empty");

  try {
    const res = await axios.post("/api/complaints", {
      userName,
      message: complaintMsg,
    });
    toast.success("Complaint submitted!");
    setComplaintMsg("");
    
    setComplaints((prev) => [res.data, ...prev]);
  } catch (err) {
    console.error(err);
    toast.error("Failed to submit complaint");
  }
};


  if (!userName) return <p className="text-green-500 mt-10 mb-70 text-center text-2xl">No user logged in</p>;
  if (loadingTickets || loadingComplaints) return <p className="text-green-700 mt-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Maintenance Tickets for {userName}</h1>

     
      {tickets.length === 0 ? (
        <p className="text-gray-600 mb-6">No maintenance tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600 hover:shadow-lg transition-shadow"
            >
              <p className="font-semibold text-green-700 mb-2">{ticket.description || "Maintenance Ticket"}</p>
              <p><strong>Amount:</strong> ₹{ticket.amount}</p>
              <p><strong>Due Date:</strong> {new Date(ticket.dueDate).toLocaleDateString()}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={ticket.status === "Paid" ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                  {ticket.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

     
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Raise a Complaint</h2>
        <form onSubmit={handleComplaintSubmit} className="mb-4">
          <textarea
            className="w-full p-3 border rounded-lg mb-2"
            rows={4}
            placeholder="Write your complaint here..."
            value={complaintMsg}
            onChange={(e) => setComplaintMsg(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition"
          >
            Submit Complaint
          </button>
        </form>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Complaints</h3>
        {complaints.length === 0 ? (
          <p className="text-gray-600">No complaints raised yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {complaints.map((c, i) => (
              <li key={i} className="py-2">
                <p className="text-gray-700">{c.message}</p>
                <p className="text-sm text-gray-500">
                  Status: <span className={c.status === "Resolved" ? "text-green-600" : "text-red-500"}>{c.status}</span> | {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserMaintenance;
