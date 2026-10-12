import axios from "axios";
import Cookies from "js-cookie";

const LIVE = "https://node-designer-e-commerce--malakmahfouz306.replit.app/api/v1/";
// const LOCAL = "http://localhost:4001/api/v1/";

const axiosInstance = axios.create({
  baseURL: LIVE,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    const isAuthEndpoint =
      url.includes("/users/login") || url.includes("/users/signup");

    if (status === 401 && !isAuthEndpoint) {
      Cookies.remove("isLoggedIn");
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
