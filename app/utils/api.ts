import axios from "axios";

interface User {
  accessToken?: string;
  refreshToken?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  type: string;
  _id: string;
  eduyear: string;
  parentPhoneNumber: string;
}

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
    const user: User = JSON.parse(userString);
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
          `${API_BASE_URL}/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        const { accessToken, refreshToken } = response.data;

        // Get existing user data from local storage
        const userString = localStorage.getItem("user");
        let user: User = {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          type: "",
          _id: "",
          eduyear: "",
          parentPhoneNumber: "",
        };
        if (userString) {
          user = JSON.parse(userString);
        }

        // Update tokens in the existing user data
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        // Save the updated user data back to local storage
        localStorage.setItem("user", JSON.stringify(user));

        // Update headers for the retry request
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // Handle token refresh failure, e.g., log out user, redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
