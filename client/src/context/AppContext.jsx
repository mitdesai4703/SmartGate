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

  const [showUserLogin, setShowUserLogin] = useState(false);

  // Check if user is authenticated
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/is-auth', { withCredentials: true });
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // Check if admin is authenticated
 const fetchAdmin = async () => {
  try {
    const { data } = await axios.get('/api/admin/is-auth');
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
  }
};


  useEffect(() => {
    fetchUser();
    fetchAdmin();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isAdmin,
    setIsAdmin,
    showUserLogin,
    setShowUserLogin,
    axios
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
