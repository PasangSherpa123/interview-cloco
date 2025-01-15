// userApi.js
import apiClient from "../Helpers/api";

// Fetch all user
export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Add a new user
export const addUser = async (artistData) => {
  try {
    const response = await apiClient.post("/user/create", artistData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Update an user
export const updateUser = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`/user/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete an user
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
