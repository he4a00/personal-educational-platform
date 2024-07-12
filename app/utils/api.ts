import axios from "axios";
import refreshToken from "./refrestToken";

let parsedToken = null;

if (typeof window !== "undefined") {
  const user = localStorage.getItem("user");
  parsedToken = user ? JSON.parse(user)?.accessToken : null;
}

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL
    : process.env.NEXT_PUBLIC_API_BASE_URL_REMOTE;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: parsedToken ? `Bearer ${parsedToken}` : undefined,
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
