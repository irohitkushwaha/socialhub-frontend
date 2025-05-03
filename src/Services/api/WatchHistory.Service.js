// src/Services/api/WatchHistoryService.js
import api from './axios';

export const watchHistoryService = {
  /**
   * Save a video to the user's watch history
   * @param {string} videoId - ID of the video to save to watch history
   * @returns {Promise} - API response confirming the video was saved to watch history
   */
  saveToWatchHistory: async (videoId) => {
    try {
      const response = await api.post(`/watchhistory/save-watchhistory/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('Error saving to watch history:', error);
      throw error;
    }
  },
  
  /**
   * Get the user's watch history
   * @param {boolean} isShorts - Whether to fetch shorts or regular videos (optional)
   * @returns {Promise} - API response with watch history data
   */
  getWatchHistory: async (isShorts = false) => {
    try {
      // The backend expects isShorts in the request body
      const response = await api.get('/watchhistory/get-watchhistory', {
        data: { isShorts }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching watch history:', error);
      throw error;
    }
  }
};