import React, { useState, useContext } from "react";
import Input from "../../input/Input";
import { validateEmail } from "../../utils/helper";
import drPic from "../../assets/images/drPic.png";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError(null);

  if (!validateEmail(email)) {
    setError("Please enter a valid email");
    return;
  }
  if (!password) {
    setError("Enter a password");
    return;
  }

  setLoading(true);
  try {
    const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });


    const { token, user } = res.data;
    if (token) localStorage.setItem("token", token);
    updateUser(user);

    // Navigate after successful login
    if (role === "patient") navigate("/dashboard");
    else if (role === "doctor") navigate("/drdashboard");
    else if (role === "admin") navigate("/admin");
  } catch (err) {
    console.error("Login error:", err);
    if (err.response?.data?.message) setError(err.response.data.message);
    else setError("Login failed. Please check credentials or network.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 md:p-10">
        <div className="flex justify-center mb-6">
          <img
            src={drPic}
            alt="Logo"
            className="w-28 h-28 md:w-33 md:h-33 object-cover rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-blue-700 mb-3 text-center">ZAIB CLINIC</h1>
        <h2 className="text-black text-xl md:text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="text-red-500 bg-red-100 border border-red-300 rounded-md p-2 text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} label="email" placeholder="example@gmail.com" type="text" />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} label="password" placeholder="Min 8 Character" type="password" />

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">-- Select Role --</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="btn-cls" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-md mt-8">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-bold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
