// src/Services/api/SubscriptionService.js
import api from "./axios";

export const subscriptionService = {
  /**
   * Subscribe to a channel via a video
   * @param {string} videoId - ID of the video whose owner you want to subscribe to
   * @returns {Promise} - API response confirming subscription
   */
  subscribe: async (videoId) => {
    try {
      const response = await api.post(`/subscription/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error subscribing to channel:", error);
      throw error;
    }
  },

  /**
   * Check if the current user is subscribed to a channel (via video)
   * @param {string} videoId - ID of the video to check subscription status for
   * @returns {Promise} - API response with subscription status
   */
  checkSubscriptionStatus: async (videoId) => {
    try {
      const response = await api.get(`/subscription/check/${videoId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error checking subscription status:", error);
      throw error;
    }
  },

  /**
   * Unsubscribe from a channel
   * @param {string} videoId - ID of the video whose owner you want to unsubscribe from
   * @returns {Promise} - API response confirming unsubscription
   */
  unsubscribe: async (videoId) => {
    try {
      const response = await api.get(`/subscription/unsubscribe/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error unsubscribing from channel:", error);
      throw error;
    }
  },

  /**
   * Get list of users who have subscribed to the current user's channel
   * @returns {Promise} - API response with subscribers list data
   */
  getSubscribersList: async () => {
    try {
      const response = await api.get("/subscription/get-subscribers-list");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching subscribers list:", error);
      throw error;
    }
  },

  /**
   * Get list of channels that the current user has subscribed to
   * @returns {Promise} - API response with subscribed channels list data
   */
  getSubscribedToList: async () => {
    try {
      const response = await api.get("/subscription/get-subscribed-to-list");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching subscribed channels list:", error);
      throw error;
    }
  },
};
