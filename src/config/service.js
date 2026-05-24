import axios from "axios";

// Get API URL based on environment
const getApiUrl = () => {
  // First check environment variable
  if (import.meta.env.VITE_API_URL) {
    console.log("Using VITE_API_URL:", import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Then check if we're in production
  if (import.meta.env.PROD) {
    return 'https://full-stack-project-backend-lovat.vercel.app/api/v1';
  }
  
  // Development fallback
  return 'http://localhost:3000';
};

const url = import.meta.env.VITE_API_URL
console.log("API Base URL:", url);

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 60000,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token && token !== 'undefined' && token !== 'null') {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token added to request:", config.url);
      } else {
        console.log("No token found for:", config.url);
      }
    } catch (error) {
      console.error('Error adding token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("Response from:", response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error("API Error Details:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;