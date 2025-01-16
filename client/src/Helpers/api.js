import axios from "axios";
import { toast } from "react-toastify";
import { errorToast } from "./toasterData";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});


// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.data.error);
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized
      if (status === 401) {
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login page
        toast.error("Session expired. Please log in again.", errorToast);
      }

      // Show other error messages
      if (data?.error) {
        console.log("error message", data?.error);
        // console.log(toast.POSITION.TOP_RIGHT);
        console.log(toast.error);
        toast.error(data.error, errorToast);
      } else {
        toast.error("An error occurred. Please try again later.", errorToast);
      }
    } else {
      toast.error("Network error. Please check your connection.", errorToast);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
