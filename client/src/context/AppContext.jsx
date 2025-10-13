import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user"); // ✅ default user
  const [loading, setLoading] = useState(true);

  // ✅ Check admin authentication
  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/is-auth", { withCredentials: true });
      if (data.success) {
        setRole("admin");
        localStorage.setItem("role", "admin");
      } else {
        setRole("user");
        localStorage.setItem("role", "user");
      }
    } catch (error) {
      setRole("user");
      localStorage.setItem("role", "user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
    fetchAdmin();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    role,
    setRole,
    loading,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
