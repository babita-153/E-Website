import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/useAuthContext";
import { authApi } from "../api/authaxiosApi";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken, user } = useContext(AuthContext);
  if (user) {
    navigate("/");
  }
  let api = authApi();

 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      let res = await api.post("/auth/login", formData);
      setAccessToken(res.data.data.accessToken);
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
      console.log("error while login user", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

            <p className="text-gray-500 mt-2">Login to your ShopEase account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{" "}
            <NavLink
              to={"/register"}
              className="text-blue-600 font-semibold hover:underline"
            >
              Create Account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
