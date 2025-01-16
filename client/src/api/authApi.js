// userApi.js
import apiClient from "../Helpers/api";

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/login", userData);
    console.log('response is' ,response);
    localStorage.setItem("authToken", response?.data?.token);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
//Register user
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
