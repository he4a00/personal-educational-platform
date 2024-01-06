import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let parsedToken = null;

if (typeof window !== "undefined") {
  const user = localStorage.getItem("user");
  parsedToken = user ? JSON.parse(user)?.accessToken : null;
}

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL_REMOTE
    : process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: parsedToken ? `Bearer ${parsedToken}` : undefined,
  },
});

export default api;
