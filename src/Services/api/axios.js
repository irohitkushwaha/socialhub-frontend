import axios from "axios";

const isMobile = window.innerWidth <= 768;

const api = axios.create({
  baseURL: isMobile
    ? "http://192.168.205.212:8000/api/v1"
    : "http://localhost:8000/api/v1",
  timeout: 60000,
  withCredentials: true, // This is what enables cookies to be sent!
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop - don't retry refresh token requests
    if (originalRequest.url === "/user/refresh-token") {
      console.log("Refresh token failed - user likely not authenticated");
      return Promise.reject(error);
    }

    // If error is 401 (Unauthorized) and we haven't retried yet
    if (
      error.response &&
      error.response.status === 401
      // !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Call the refresh token endpoint (cookie is sent automatically)
        console.log("before calling refresh token");
        await api.post("/user/refresh-token");
        console.log("after calling refresh token");

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        console.log("Refresh token failed. Redirecting to login page.");

        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
