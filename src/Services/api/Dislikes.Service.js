// src/Services/api/DislikesService.js
import api from "./axios";

// MONGODB_URI=mongodb://%40SocialHubUser:%40%40SOCIALHUB%23ROh%40it%23KuSH2025r@143.110.253.138:27017/socialhub?authSource=socialhub 
// CORS_ORIGIN=http://localhost:5173
// ACCESS_TOKEN_SECRET = 57ac542e9a1b52936f2eae4d2157a3b2814c82921ad7bcb09d9ee3a7b9b6fc8b0
// ACCESS_TOKEN_EXPIRE=1d
// REFRESH_TOKEN_SECRET=a9c5b42d0d199f4fb2bc65ad38c6e3f2a1dff6db3e7fd585e64e4f3ffb1749b8
// REFRESH_TOKEN_EXPIRE=7d
// CLOUDINARY_CLOUD_NAME=rohitkushwaha
// CLOUDINARY_API_KEY=516793681544741
// CLOUDINARY_API_SECRET=xYzspWh5DrQGuNOKQtUNJt2ZcUo
// GOOGLE_CLIENT_ID=838190258194-rm16sjtjaa3a4hqb6loo77fnv657k11h.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET=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
// GEMINI_API_KEY=AIzaSyD01Sgs3FzE1eoOzfCY7l7LkAawBNqnNQw
// PORT=8000
// ELASTICSEARCH_URL=http://143.110.253.138:9200







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
