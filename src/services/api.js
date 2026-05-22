import axios from "axios";
import { getCookie, clearAccessToken } from "../utils/cookies";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://expatcares.ae/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// Attach token from cookie (if present)
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Global response handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken();
      // let the UI handle redirects
    }
    return Promise.reject(error);
  },
);

export const authAPI = {
  register: (data) => apiClient.post("/patient/register", data),
  verifyEmail: (data) => apiClient.post("/user/verifyEmail", data),
  // normalized login returns { token, user, raw }
  login: async (data) => {
    const res = await apiClient.post("/user/login", data);
    const d = res.data || {};
    const token = d.accessToken || d.token || d?.token;
    const user = d.user || d?.user || null;
    return { token, user, raw: d };
  },
  logout: () => {
    clearAccessToken();
    return Promise.resolve();
  },
};

export default apiClient;
