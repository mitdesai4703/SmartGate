import React, { useState, useEffect } from "react";
import { useAppContext } from "../../src/context/AppContext";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const { role, setRole, navigate, axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });
      if (data.success) {
        toast.success("Welcome back, Admin ");
       setRole("admin");
         localStorage.setItem("role", "admin");
         navigate("/admin/dashboard"); 
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Invalid credentials or server issue");
    }
  };

  useEffect(() => {
  if (role === "admin") {
    navigate("/admin/dashboard");
  }
}, [role]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Admin Login
        </h2>

        <div className="relative mb-6">
          <input
            type="email"
            required
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-green-500"
          />
          <label className="absolute left-4 top-3 text-white/70 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-focus:top-[-8px] peer-focus:text-green-400 peer-focus:text-xs transition-all">
            Email
          </label>
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            required
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-green-500"
          />
          <label className="absolute left-4 top-3 text-white/70 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-focus:top-[-8px] peer-focus:text-green-400 peer-focus:text-xs transition-all">
            Password
          </label>
        </div>

        <button className="w-full py-3 bg-green-600 rounded-xl text-white font-semibold hover:bg-green-500 transition">
          Login
        </button>

        <p className="text-center text-white/70 mt-6 text-sm">
          Need help?{" "}
          <span
            onClick={() => toast("Contact system administrator")}
            className="text-green-400 cursor-pointer underline"
          >
            Support
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
