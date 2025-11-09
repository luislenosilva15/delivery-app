// src/api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
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
  }
);

export default apiClient;
