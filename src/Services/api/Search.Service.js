// src/Services/api/Search.Service.js
import api from "./axios.js";

export const searchService = {
  /**
   * Search for users and videos with the given keyword
   * @param {Object} searchParams - Search parameters
   * @param {string} searchParams.keyword - The search term
   * @param {number} searchParams.page - Page number (starts at 0)
   * @param {number} searchParams.size - Number of results per page
   * @returns {Promise} - API response with search results containing users and videos
   */
  search: async (searchParams = { keyword: "", page: 0, size: 10 }) => {
    try {
      const response = await api.get("/uservideo/search", {
        params: {
          keyword: searchParams.keyword,
          page: searchParams.page,
          size: searchParams.size
        }
      });
      
      return response.data.data;
    } catch (error) {
      console.error("Error performing search:", error);
      throw error;
    }
  }
};