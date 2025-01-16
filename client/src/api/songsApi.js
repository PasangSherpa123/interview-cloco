// songApi.js
import apiClient from '../Helpers/api';

// Fetch all songs
export const fetchSongs = async(artistId) => {
  try {
    const response = await apiClient.get(`/songs/${artistId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

// Add a new song
export const addSong = async (songData) => {
  try {
    const response = await apiClient.post('/songs/create', songData);
    return response.data;
  } catch (error) {
    console.error('Error adding song:', error);
    throw error;
  }
};

// Update an song
export const updateSong = async (artistId, id, updatedData) => {
  try {
    console.log(artistId, id);
    const response = await apiClient.put(`/songs/${artistId}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating artist:', error);
    throw error;
  }
};

// Delete an song
export const deleteSong = async (id) => {
  try {
    const response = await apiClient.delete(`/songs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting artist:', error);
    throw error;
  }
};
