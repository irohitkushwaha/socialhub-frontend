// src/Services/api/DislikesService.js
import api from "./axios";

export const dislikesService = {
  /**
   * Dislike a video
   * @param {string} videoId - ID of the video to dislike
   * @returns {Promise} - API response confirming dislike was saved
   */
  dislikeVideo: async (videoId) => {
    try {
      const response = await api.post(`/dislike/video/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error disliking video:", error);
      throw error;
    }
  },
  
  /**
   * Dislike a comment
   * @param {string} commentId - ID of the comment to dislike
   * @returns {Promise} - API response confirming dislike was saved
   */
  dislikeComment: async (commentId) => {
    try {
      const response = await api.post(`/dislike/comment/${commentId}`);
      return response.data;
    } catch (error) {
      console.error("Error disliking comment:", error);
      throw error;
    }
  }
};