// src/api/apiClient.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const apiClient = axios.create({
  baseURL,
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const client = localStorage.getItem("clientId");

    if (client) {
      config.headers = config.headers || {};
      config.headers.clientId = client;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
