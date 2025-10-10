import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });
  const [loading, setLoading] = useState(true);

 const fetchAdmin = async () => {
    try {
        const { data } = await axios.get("/api/admin/is-auth", { withCredentials: true });
        if (data.success) {
            setIsAdmin(true);
            localStorage.setItem("isAdmin", "true");
        } else {
            setIsAdmin(false);
            localStorage.removeItem("isAdmin");
        }
    } catch (error) {
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchAdmin();
}, []);

  const value = {
    navigate,
    user,
    setUser,
    isAdmin,
    setIsAdmin,
    loading,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
