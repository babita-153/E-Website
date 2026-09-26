import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/useAuthContext";

export const productsApi = () => {
  const { accessToken } = useContext(AuthContext);

  
  const api = axios.create({
    baseURL: "http://localhost:5173/api",
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
