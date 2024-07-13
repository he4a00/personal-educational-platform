import axios from "axios";

let parsedToken: string | null = null;

if (typeof window !== "undefined") {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    parsedToken = user?.accessToken ?? null;
  }
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

// Example using Axios interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get(
          "http://localhost:4040/api/users/refreshToken"
        );
        if (response.status === 200) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.accessToken;
          originalRequest.headers["Authorization"] =
            "Bearer " + response.data.accessToken;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
