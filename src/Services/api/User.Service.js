// src/Services/api/userService.js
import api from './axios';

export const userService = {
  /**
   * Register a new user with avatar and optional cover image
   * @param {Object} userData - User registration data
   * @param {string} userData.FullName - User's full name
   * @param {string} userData.Email - User's email address
   * @param {string} userData.Password - User's password
   * @param {File} userData.Avatar - User's profile picture (required)
   * @param {File} userData.CoverImage - User's cover image (optional)
   * @returns {Promise} - API response with registered user data
   */
  registerUser: async (userData) => {
    try {
      const formData = new FormData();
      
      // Append form fields
      formData.append('FullName', userData.FullName);
      formData.append('Email', userData.Email);
      formData.append('Password', userData.Password);
      
      // Append files
      formData.append('Avatar', userData.Avatar);
      if (userData.CoverImage) {
        formData.append('CoverImage', userData.CoverImage);
      }
      
      const response = await api.post('/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },


  /**
 * Get a channel's details by user ID
 * @param {string} userId - ID of the user/channel to fetch details for
 * @returns {Promise} - API response with channel details, subscriber count, videos and other data
 */
getChannelDetail: async (userId) => {
  try {
    const response = await api.get(`/user/channel/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching channel details:', error);
    throw error;
  }
},
  
  /**
   * Log in a user with username/email and password
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.userNameOrEmail - Username or email
   * @param {string} credentials.password - User's password
   * @returns {Promise} - API response with user data and tokens (in cookies)
   */
  login: async (credentials) => {
    try {
      // Determine if input is email or username
      const isEmail = credentials.userNameOrEmail.includes('@');
      
      const loginData = {
        Password: credentials.password
      };
      
      // Set either Email or UserName based on the input
      if (isEmail) {
        loginData.Email = credentials.userNameOrEmail;
      } else {
        loginData.UserName = credentials.userNameOrEmail;
      }
      
      const response = await api.post('/user/login', loginData);
      return response.data.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  
  /**
   * Log out the current user
   * @returns {Promise} - API response confirming logout
   */
  logout: async () => {
    try {
      const response = await api.post('/user/logout');
      console.log("logged out called", response)
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  
  /**
   * Change user's password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.oldPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @returns {Promise} - API response confirming password change
   */
  changePassword: async (passwordData) => {
    try {
      const response = await api.post('/user/change-password', {
        OldPassword: passwordData.oldPassword,
        NewPassword: passwordData.newPassword
      });
      
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },
  
  /**
   * Get current logged-in user's profile
   * @returns {Promise} - API response with user data
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/user/get-user');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },
  
  /**
   * Update user's profile details
   * @param {Object} updateData - User data to update
   * @param {string} updateData.fullName - Updated full name (optional)
   * @param {string} updateData.userName - Updated username (optional)
   * @param {string} updateData.email - Updated email (optional)
   * @returns {Promise} - API response with updated user data
   */
  updateUserDetails: async (updateData) => {
    try {
      // Create an object with only the fields that are provided
      const updateFields = {};
      if (updateData.fullName) updateFields.FullName = updateData.fullName;
      if (updateData.userName) updateFields.UserName = updateData.userName;
      if (updateData.email) updateFields.Email = updateData.email;
      
      const response = await api.patch('/user/update-user-detail', updateFields);
      return response.data.data;
    } catch (error) {
      console.error('Error updating user details:', error);
      throw error;
    }
  },
  
  /**
   * Change user's avatar
   * @param {File} avatarFile - New avatar image file
   * @returns {Promise} - API response with updated avatar URL
   */
  changeAvatar: async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append('Avatar', avatarFile);
      
      const response = await api.patch('/user/change-user-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error changing avatar:', error);
      throw error;
    }
  },
  
  /**
   * Change user's cover image
   * @param {File} coverImageFile - New cover image file
   * @returns {Promise} - API response with updated cover image URL
   */
  changeCoverImage: async (coverImageFile) => {
    try {
      const formData = new FormData();
      formData.append('CoverImage', coverImageFile);
      
      const response = await api.patch('/user/change-cover-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error changing cover image:', error);
      throw error;
    }
  },
  
  /**
   * Get a user's channel details by username
   * @param {string} username - Username of the channel to fetch
   * @returns {Promise} - API response with channel and subscriber data
   */
  getUserChannel: async (username) => {
    try {
      const response = await api.get(`/user/user-channel?UserName=${username}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user channel:', error);
      throw error;
    }
  },
  
  /**
   * Get the current user's watch history
   * @returns {Promise} - API response with watch history data
   */
  getWatchHistory: async () => {
    try {
      const response = await api.get('/user/get-watchhistory');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching watch history:', error);
      throw error;
    }
  },
  
  /**
   * Initiate Google OAuth login
   * @returns {string} - Google OAuth URL to redirect to
   */
  googleLogin: () => {
    return `${api.defaults.baseURL}/user/auth/google`;
  },
  
  /**
   * Handle Google OAuth callback (typically handled by your routing)
   * @param {string} code - Authorization code from Google
   * @returns {Promise} - API response with user data and tokens
   */
};