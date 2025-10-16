import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AdminAnnouncements = () => {
  const { axios } = useAppContext();
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fetchAnnouncements = async () => {
  try {
    const { data } = await axios.get("/api/announcements/get");
    setAnnouncements(data.announcements);
  } catch (error) {
    console.error("Fetch error:", error);
    toast.error("Failed to load announcements");
  }
};

const handleCreate = async (e) => {
  e.preventDefault();
  if (!title || !message) return toast.error("Please fill all fields");

  try {
    await axios.post("/api/announcements/create", { title, message });
    toast.success("Announcement created");
    setTitle("");
    setMessage("");
    fetchAnnouncements();
  } catch (error) {
    console.error("Create error:", error);
    toast.error("Error creating announcement");
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`/api/announcements/${id}`);
      toast.success("Deleted successfully");
      fetchAnnouncements();
    } catch {
      toast.error("Error deleting");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4"> Manage Announcements</h2>

      <form
        onSubmit={handleCreate}
        className="mb-6 p-4 bg-gray-50 rounded-lg border"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>

      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="p-4 bg-gray-100 rounded-lg shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold">{a.title}</h3>
              <p>{a.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => handleDelete(a._id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
