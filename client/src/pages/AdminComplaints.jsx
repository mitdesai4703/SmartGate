import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("/api/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.patch(`/api/complaints/${id}`, { status: "Resolved" });
      toast.success("Complaint marked as resolved");
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: "Resolved" } : c))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update complaint");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading complaints...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">User Complaints</h1>

      {complaints.length === 0 ? (
        <p className="text-gray-600">No complaints found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500"
            >
              <p className="font-semibold">{c.userName}</p>
              <p className="text-gray-700 my-2">{c.message}</p>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(c.createdAt).toLocaleString()}
              </p>
              <p>
                Status:{" "}
                <span
                  className={
                    c.status === "Resolved" ? "text-green-600" : "text-red-500"
                  }
                >
                  {c.status}
                </span>
              </p>

              {c.status !== "Resolved" && (
                <button
                  onClick={() => handleResolve(c._id)}
                  className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
