// src/Services/api/LikesService.js
import api from "./axios";

export const likesService = {
  /**
   * Like a video
   * @param {string} videoId - ID of the video to like
   * @returns {Promise} - API response confirming like was saved
   */
  likeVideo: async (videoId) => {
    try {
      const response = await api.post(`/likes/video/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error liking video:", error);
      throw error;
    }
  },

  /**
   * Delete like for a video
   * @param {string} videoId - ID of the video to unlike
   * @returns {Promise} - API response confirming like was removed
   */
  deleteLikeVideo: async (videoId) => {
    try {
      const response = await api.delete(`/likes/video/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting like for video:", error);
      throw error;
    }
  },

  /**
   * Like a comment
   * @param {string} commentId - ID of the comment to like
   * @returns {Promise} - API response confirming like was saved
   */
  likeComment: async (commentId) => {
    try {
      const response = await api.post("/likes/comment", {
        CommentId: commentId,
      });
      return response.data;
    } catch (error) {
      console.error("Error liking comment:", error);
      throw error;
    }
  },

  deleteLikeComment: async (commentId) => {
    try {
      const response = await api.delete("/likes/comment", {
        data: { CommentId: commentId }
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting like for comment:", error);
      throw error;
    }
  },

  /**
   * Like a post
   * @param {string} postId - ID of the post to like
   * @returns {Promise} - API response confirming like was saved
   */
  likePost: async (postId) => {
    try {
      const response = await api.post(`/likes/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  },

  /**
   * Delete like for a post
   * @param {string} postId - ID of the post to unlike
   * @returns {Promise} - API response confirming like was removed
   */
  deleteLikePost: async (postId) => {
    try {
      const response = await api.delete(`/likes/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting like for post:", error);
      throw error;
    }
  },

  /**
   * Get all videos liked by the current user
   * @returns {Promise} - API response with liked videos data
   */
  getLikedVideos: async () => {
    try {
      const response = await api.get("/likes/liked-videos");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching liked videos:", error);
      throw error;
    }
  },
};
