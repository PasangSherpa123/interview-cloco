// artistApi.js
import apiClient from '../Helpers/api';

// Fetch all artists
export const fetchArtists = async(currentPage) => {
  try {
    const response = await apiClient.get(`/artist?page=${currentPage}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

// Add a new artist
export const addArtist = async (artistData) => {
  try {
    const response = await apiClient.post('/artist/create', artistData);
    return response.data;
  } catch (error) {
    console.error('Error adding artist:', error);
    throw error;
  }
};

// Update an artist
export const updateArtist = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`/artist/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating artist:', error);
    throw error;
  }
};

// Delete an artist
export const deleteArtist = async (id) => {
  try {
    console.log(id);
    const response = await apiClient.delete(`/artist/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting artist:', error);
    throw error;
  }
};
