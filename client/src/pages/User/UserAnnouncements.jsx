import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const UserAnnouncements = () => {
  const { axios } = useAppContext();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await axios.get("/api/announcements");
        setAnnouncements(data.announcements);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a._id} className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">{a.title}</h3>
              <p>{a.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAnnouncements;
