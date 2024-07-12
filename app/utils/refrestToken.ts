import api from "./api";

const refreshToken = async () => {
  try {
    const response = await api.post(
      `/refresh-token`,
      {},
      { withCredentials: true }
    );
    const newAccessToken = response.data.accessToken;
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      user.accessToken = newAccessToken;
      localStorage.setItem("user", JSON.stringify(user));
    }
    return newAccessToken;
  } catch (error) {
    console.error("Unable to refresh token", error);
    throw error;
  }
};

export default refreshToken;
