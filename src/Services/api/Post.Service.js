// src/Services/api/PostService.js
import api from './axios';

export const postService = {
  /**
   * Upload a new post with image and caption
   * @param {Object} postData - Post data
   * @param {File} postData.PostImage - Post image file
   * @param {string} postData.Caption - Post caption/title
   * @returns {Promise} - API response with the created post data
   */
  uploadPost: async (postData) => {
    try {
      const formData = new FormData();
      formData.append('PostImage', postData.PostImage);
      formData.append('Caption', postData.Caption);
      
      const response = await api.post('/post/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading post:', error);
      throw error;
    }
  },
  
  /**
   * Get paginated list of posts
   * @param {Object} params - Pagination parameters
   * @param {number} params.page - Page number (starts at 1)
   * @param {number} params.limit - Number of posts per page
   * @returns {Promise} - API response with list of posts
   */
  getPosts: async (params = { page: 1, limit: 10 }) => {
    try {
      const response = await api.get('/post/get', {
        params: {
          page: params.page,
          limit: params.limit
        }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
};