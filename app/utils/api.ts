import axios from "axios";
import refreshToken from "./refrestToken";

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

export default api;
