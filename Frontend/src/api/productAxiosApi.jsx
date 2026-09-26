import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/useAuthContext";

export const productsApi = () => {
  const { accessToken } = useContext(AuthContext);

  
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
