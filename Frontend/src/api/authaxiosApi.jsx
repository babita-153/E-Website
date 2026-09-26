import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/useAuthContext.jsx";

export const authApi = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);
 
  const api = axios.create({
    baseURL:"https://e-commerce-1-q1c5.onrender.com/api",
    withCredentials: true,
  });

  api.interceptors.request.use(config => {
    if (accessToken) {
     config.headers.Authorization=`Bearer ${accessToken}`
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const res = await api.post("/api/auth/refresh");
       
        setAccessToken(res.data.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
        return axios(error.config);
      }
      return Promise.reject(error);
    },
  );

  return api;
};
