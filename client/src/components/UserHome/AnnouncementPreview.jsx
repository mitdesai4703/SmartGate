import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Megaphone, CalendarDays } from "lucide-react";

const AnnouncementPreview = () => {
  const { axios } = useAppContext();
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data } = await axios.get("/api/announcements/get");
        setAnnouncements(data.announcements.slice(0, 2)); 
      } catch (err) {
        console.error("Error loading announcements:", err);
      }
    };
    fetchLatest();
  }, []);

  if (announcements.length === 0) return null;

  return (
    <section className="relative w-full bg-gradient-to-b from-blue-50 to-blue-100/30 rounded-2xl shadow-md p-6 sm:p-8 mt-10 border border-blue-100">
      
      <div className="flex flex-col items-center gap-3 mb-5 text-center">
       
          
       
        <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">
          Latest Announcements
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="flex flex-col justify-between w-full sm:w-[45%] bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2 text-center sm:text-left">
                {a.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center sm:text-left">
                {a.message}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-gray-400 text-xs justify-center sm:justify-start">
              <CalendarDays className="w-4 h-4" />
              {new Date(a.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/user-announcements")}
          className="bg-[#00996D] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#007F5A] transition-all duration-200 cursor-pointer"
        >
          View All →
        </button>
      </div>
    </section>
  );
};

export default AnnouncementPreview;
