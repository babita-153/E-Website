import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/useAuthContext";

export const productsApi = () => {
  const { accessToken } = useContext(AuthContext);

  
  const api = axios.create({
    baseURL: "https://e-commerce-1-q1c5.onrender.com/api",
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
  return api;
};
