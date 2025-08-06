// src/Services/api/CommentService.js
import api from "./axios.js";

export const commentService = {
  /**
   * Save a comment on a video
   * @param {Object} commentData - Comment data
   * @param {string} commentData.videoId - ID of the video to comment on
   * @param {string} commentData.content - Comment content
   * @returns {Promise} - API response with saved comment data
   */
  saveVideoComment: async (commentData) => {
    try {
      const response = await api.post(
        `/comment/save-video/${commentData.videoId}`,
        {
          content: commentData.content,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving video comment:", error);
      throw error;
    }
  },

  /**
   * Get comments for a video
   * @param {Object} params - Query parameters
   * @param {string} params.videoId - ID of the video to get comments for
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Number of comments per page (default: 10)
   * @returns {Promise} - API response with video comments data
   */
  getVideoComments: async (params = { page: 1, limit: 10 }) => {
    try {
      const response = await api.get("/comment/send-video", {
        params: {
          videoid: params.videoId,
          page: params.page,
          limit: params.limit,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching video comments:", error);
      throw error;
    }
  },

  /**
   * Save a comment on a post
   * @param {Object} commentData - Comment data
   * @param {string} commentData.postId - ID of the post to comment on
   * @param {string} commentData.content - Comment content
   * @returns {Promise} - API response with saved comment data
   */
  savePostComment: async (commentData) => {
    try {
      const response = await api.post(
        `/comment/save-post/${commentData.postId}`,
        {
          content: commentData.content,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving post comment:", error);
      throw error;
    }
  },

  /**
   * Get comments for a post
   * @param {Object} params - Query parameters
   * @param {string} params.postId - ID of the post to get comments for
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Number of comments per page (default: 10)
   * @returns {Promise} - API response with post comments data
   */
  getPostComments: async (params = { page: 1, limit: 10 }) => {
    try {
      const response = await api.get("/comment/send-post", {
        params: {
          postid: params.postId,
          page: params.page,
          limit: params.limit,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching post comments:", error);
      throw error;
    }
  },

  /**
   * Get AI-generated summary of comments for a video or post
   * @param {Object} params - Query parameters
   * @param {string} [params.videoId] - ID of the video (provide either videoId or postId)
   * @param {string} [params.postId] - ID of the post (provide either videoId or postId)
   * @returns {Promise} - API response with comment summary
   */
  getCommentSummary: async (params) => {
    try {
      const queryParams = {};

      if (params.videoId) {
        queryParams.videoid = params.videoId;
      } else if (params.postId) {
        queryParams.postid = params.postId;
      } else {
        throw new Error("Either videoId or postId must be provided");
      }

      const response = await api.get("/comment/summarize-comments", {
        params: queryParams,
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching comment summary:", error);
      throw error;
    }
  },
};
