import axios from "axios";

let parsedToken = null;

if (typeof window !== "undefined") {
  const user = localStorage.getItem("user");
  parsedToken = user ? JSON.parse(user)?.accessToken : null;
}

const api = axios.create({
  baseURL: "http://localhost:4040/api/",
  withCredentials: true,
  headers: {
    Authorization: parsedToken ? `Bearer ${parsedToken}` : undefined,
  },
});

export default api;
