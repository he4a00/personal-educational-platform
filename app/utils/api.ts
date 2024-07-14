import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL
    : process.env.NEXT_PUBLIC_API_BASE_URL_REMOTE;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    const token = user?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${API_BASE_URL}users/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        const { accessToken, refreshToken } = response.data;

        localStorage.setItem(
          "user",
          JSON.stringify({ accessToken, refreshToken })
        );

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
