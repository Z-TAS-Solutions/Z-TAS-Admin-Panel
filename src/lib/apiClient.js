import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://api.z-tas.com/api/v1";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

function getStoredToken() {
  return localStorage.getItem("token") || localStorage.getItem("access_token");
}

function isPublicAuthPath(url) {
  if (!url || typeof url !== "string") return false;
  return (
    url.includes("/admin/users/register/") ||
    url.includes("/webauthn/register/begin") ||
    url.includes("/webauthn/register/finish") ||
    url.includes("/webauthn/login/begin") ||
    url.includes("/webauthn/login/finish")
  );
}

// Request Interceptor: Attach authentication token
apiClient.interceptors.request.use(
  (config) => {
    if (config.url?.endsWith("/ping")) {
      return config;
    }
    if (isPublicAuthPath(config.url || "")) {
      return config;
    }
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, config } = error.response;

      if (status === 401) {
        if (!isPublicAuthPath(config?.url || "")) {
          localStorage.removeItem("token");
          localStorage.removeItem("access_token");
          if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
            window.location.href = "/login";
          }
        }
      } else if (status === 403) {
        console.error("You don't have permission to do this");
        alert("You don't have permission to do this");
      } else if (status === 404) {
        console.error("Not found");
      } else if (status === 429) {
        console.warn("Too many requests, please slow down");
        alert("Too many requests, please slow down");
      } else if (status >= 500) {
        console.error("Something went wrong, please try again");
        alert("Something went wrong, please try again");
      }
    } else if (error.request) {
      console.error("No response received from server.");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
