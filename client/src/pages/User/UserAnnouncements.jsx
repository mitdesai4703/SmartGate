import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Megaphone, CalendarDays } from "lucide-react"; 

const UserAnnouncements = () => {
  const { axios } = useAppContext();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await axios.get("/api/announcements/get");
        setAnnouncements(data.announcements);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
     
      <div className="max-w-3xl text-center mb-10">
        <div className="flex justify-center mb-4">
          <Megaphone className="text-blue-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Community Announcements
        </h1>
        <p className="text-gray-600">
          Stay updated with the latest news, events, and notices from your community.
        </p>
      </div>

    
      <div className="max-w-4xl w-full space-y-6">
        {announcements.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">
              No announcements yet. Check back later!
            </p>
          </div>
        ) : (
          announcements.map((a) => (
            <div
              key={a._id}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {a.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{a.message}</p>
                </div>
              </div>
              <div className="flex items-center mt-4 text-gray-500 text-sm">
                <CalendarDays className="w-4 h-4 mr-2" />
                {new Date(a.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserAnnouncements;
