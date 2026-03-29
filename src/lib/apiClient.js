import axios from 'axios';

// Create a central Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.z-tas.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach authentication token
apiClient.interceptors.request.use(
  (config) => {
    // The /ping endpoint does NOT need an Authorization header according to specs
    if (!config.url.endsWith('/ping')) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('access_token');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        console.error("You don't have permission to do this");
        alert("You don't have permission to do this"); // Replace with toast if preferred
      } else if (status === 404) {
        console.error("Not found");
        // Handled silently globally or explicitly per-component
      } else if (status === 429) {
        console.warn("Too many requests, please slow down");
        alert("Too many requests, please slow down");
      } else if (status >= 500) {
        console.error("Something went wrong, please try again");
        alert("Something went wrong, please try again"); // Replace with toast if preferred
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from server.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
