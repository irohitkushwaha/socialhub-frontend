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
   * Delete dislike for a video
   * @param {string} videoId - ID of the video to remove dislike
   * @returns {Promise} - API response confirming dislike was removed
   */
  deleteDislikeVideo: async (videoId) => {
    try {
      const response = await api.delete(`/dislike/video/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting dislike for video:", error);
      throw error;
    }
  },

  /**
   * Dislike a comment
   * @param {string} commentId - ID of the comment to dislike
   * @returns {Promise} - API response confirming dislike was saved
   */
  dislikeComment: async (commentId) => {
    console.log("in service dislike comment", commentId)
    try {
      const response = await api.post(`/dislike/comment/${commentId}`);
      return response.data;
    } catch (error) {
      console.error("Error disliking comment:", error);
      throw error;
    }
  },
  /**
   * Delete dislike for a comment
   * @param {string} commentId - ID of the comment to remove dislike
   * @returns {Promise} - API response confirming dislike was removed
   */
  deleteDislikeComment: async (commentId) => {
    try {
      const response = await api.delete(`/dislike/comment/${commentId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting dislike for comment:", error);
      throw error;
    }
  },
};
