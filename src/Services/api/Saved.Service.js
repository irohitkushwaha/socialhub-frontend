// src/Services/api/SavedService.js
import api from './axios';

export const savedService = {
  /**
   * Save a reel (short video) to the user's saved collection
   * @param {string} reelId - ID of the reel to save
   * @returns {Promise} - API response confirming reel was saved
   */

  //DELETE SAVE REEL ALSO REQUIRED - .deleteSavedReel
  saveReel: async (reelId) => {
    try {
      const response = await api.post(`/saved/reel/${reelId}`);
      return response.data;
    } catch (error) {
      console.error('Error saving reel:', error);
      throw error;
    }
  },

  /**
   * Save a post to the user's saved collection
   * @param {string} postId - ID of the post to save
   * @returns {Promise} - API response confirming post was saved
   */
  savePost: async (postId) => {
    try {
      const response = await api.post(`/saved/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  },
  
  /**
   * Get all saved reels for the current user
   * @returns {Promise} - API response with saved reels data
   */
  getSavedReels: async () => {
    try {
      const response = await api.get('/saved/get');
      return response.data.data;
    } catch (error) {
      // Special handling for "no saved reels found" which returns 200 status but with an error
      if (error.response && error.response.status === 200) {
        return []; // Return empty array for no saved reels
      }
      console.error('Error fetching saved reels:', error);
      throw error;
    }
  },

  /**
 * Delete a saved reel from the user's collection
 * @param {string} reelId - ID of the reel to unsave
 * @returns {Promise} - API response confirming reel was unsaved
 */
deleteSavedReel: async (reelId) => {
  try {
    const response = await api.delete(`/saved/reel/${reelId}`);
    return response.data;
  } catch (error) {
    console.error('Error unsaving reel:', error);
    throw error;
  }
},

/**
 * Delete a saved post from the user's collection
 * @param {string} postId - ID of the post to unsave
 * @returns {Promise} - API response confirming post was unsaved
 */
deleteSavePost: async (postId) => {
  try {
    const response = await api.delete(`/saved/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error unsaving post:', error);
    throw error;
  }
},
};