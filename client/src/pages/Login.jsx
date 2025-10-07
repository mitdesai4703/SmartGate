import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      
      login(user, token);

      navigate("/admin-dashboard"); 
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003B2F] via-[#00996D] to-[#4FBF8B]">
      <div className="bg-white/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[90%] sm:w-[400px]">
        <h2 className="text-3xl font-bold text-center text-[#003B2F] mb-6">
          Smart<span className="text-[#00996D]">Gate</span>
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 text-sm p-2 rounded-md mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00996D]"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00996D]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00996D] text-white font-semibold py-2 rounded-lg hover:bg-[#007F5A] transition-all duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
