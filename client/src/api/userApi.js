// userApi.js
import apiClient from "../Helpers/api";

// Fetch all user
export const fetchUsers = async (currentPage) => {
  try {
    const response = await apiClient.get(`/user?page=${currentPage}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return error;
  }
};

// Add a new user
export const addUser = async (artistData) => {
  try {
    const response = await apiClient.post("/user/create", artistData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    return error;
  }
};

// Update an user
export const updateUser = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`/user/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return error;
  }
};

// Delete an user
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return error;
  }
};
