import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 10000,
    withCredentials: true,  // This is what enables cookies to be sent!
  });

export default api;