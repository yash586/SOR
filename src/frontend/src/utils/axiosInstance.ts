import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/sor",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error ::", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.error("Response error ::", error.response);
      localStorage.removeItem("token");
      localStorage.removeItem("hashId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
