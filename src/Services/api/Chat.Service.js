// src/Services/api/ChatService.js
import api from "./axios.js";

export const chatService = {
  /**
   * Get all registered users except the current logged-in user
   * @returns {Promise} - API response with list of users
   */
  getAllUsers: async () => {
    try {
      const response = await api.get("/chat/get-all-users-except-current");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Upload files for chat (images and/or documents)
   * @param {Object} files - Files to upload
   * @param {File[]} [files.images] - Array of image files
   * @param {File[]} [files.documents] - Array of document files
   * @returns {Promise} - API response with uploaded file data
   */
  uploadChatFiles: async (files) => {
    try {
      const formData = new FormData();

      // Add images if provided
      if (files.images && files.images.length > 0) {
        files.images.forEach((image, index) => {
          formData.append("images", image);
        });
      }

      // Add documents if provided
      if (files.documents && files.documents.length > 0) {
        files.documents.forEach((document, index) => {
          formData.append("documents", document);
        });
      }

      const response = await api.post("/chat/upload-chat-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error uploading chat files:", error);
      throw error;
    }
  },

  /**
   * Get chat history with another user
   * @param {string} otherUserId - ID of the user to get chat history with
   * @returns {Promise} - API response with chat history data
   */
  getChatHistory: async (otherUserId) => {
    try {
      const response = await api.get(`/chat/get-chat-history/${otherUserId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }
  },

  /**
   * Send a message to another user
   * Note: This is implemented via Socket.io in the actual app,
   * but this method can be used for testing or fallback purposes
   * @param {Object} messageData - Message data
   * @returns {Promise} - API response confirming message was sent
   */
};
