// src/Services/api/videoService.js
import api from './axios';

export const videoService = {
  /**
   * Upload a new video with optional thumbnail
   * @param {Object} data - Video data
   * @param {File} data.videoFile - The video file to upload
   * @param {File} data.thumbnailFile - Optional thumbnail file
   * @param {string} data.title - Video title
   * @param {string} data.description - Video description (optional for shorts)
   * @param {boolean} data.publishStatus - Whether to publish the video
   * @param {boolean} data.isShorts - Whether this is a short video
   * @returns {Promise} - API response with uploaded video details
   */
  uploadVideo: async (data) => {
    try {
      const formData = new FormData();
      
      // Append video file
      formData.append('Video', data.videoFile);
      
      // Append thumbnail if provided
      if (data.thumbnailFile) {
        formData.append('Thumbnail', data.thumbnailFile);
      }
      
      // Append other fields
      formData.append('Title', data.title);
      formData.append('PublishStatus', data.publishStatus);
      formData.append('isShorts', data.isShorts);
      
      // Append description if provided
      if (data.description) {
        formData.append('Description', data.description);
      }
      
      const response = await api.post('/video/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }, 
        timeout : 7200000 // 2hr
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  },
  
  /**
   * Get a list of regular videos with pagination
   * @param {number} page - Page number (starts at 1)
   * @param {number} limit - Number of videos per page
   * @returns {Promise} - API response with video list, pagination details
   */
  getVideosList: async (page = 1, limit = 20) => {
    try {
      const response = await api.get('/video/videos-list', {
        params: { page, limit }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching videos list:', error);
      throw error;
    }
  },
  
  /**
   * Get a list of short videos with pagination
   * @param {number} page - Page number (starts at 1)
   * @param {number} limit - Number of videos per page
   * @returns {Promise} - API response with shorts list, pagination details
   */
  getShortsList: async (page = 1, limit = 10, excludeIds) => {
    try {
      const response = await api.get('/video/shorts-list', {
        params: { page, limit, excludeIds }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching shorts list:', error);
      throw error;
    }
  },
  
  /**
   * Get a specific video with user and subscriber details
   * @param {string} videoId - ID of the video to fetch
   * @returns {Promise} - API response with video details, owner info, and stats
   */
  getVideoDetails: async (VideoId) => {
    try {
      const response = await api.get(`/video/each-video/${VideoId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching video details:', error);
      throw error;
    }
  },

/**
   * Get a single short video by ID
   * @param {string} videoId - ID of the short video to fetch
   * @returns {Promise} - API response with video details, owner info, and interaction status
   */
getSingleShort: async (videoId) => {
  try {
    const response = await api.get(`/video/shorts/${videoId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching single short video:', error);
    throw error;
  }
},

};