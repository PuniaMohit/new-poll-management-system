import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    if (token) {
      config.headers["Token"] = token;
    }
    return config;
  });

  export default api;