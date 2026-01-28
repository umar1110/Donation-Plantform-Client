// lib/api.ts
import axios from "axios";
import { useAuthStore } from "@/src/stores/auth.store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor - Add access token
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - Auto refresh token & extract data
api.interceptors.response.use(
  (response) => {
    // Backend returns { success, message, data } - extract data directly
    if (response.data && 'data' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Skip token refresh for auth endpoints (login, register, etc.)
    const isAuthEndpoint = originalRequest.url?.includes('/auth/login') || 
                           originalRequest.url?.includes('/auth/register') ||
                           originalRequest.url?.includes('/orgs');

    // If 401 and haven't retried yet and NOT an auth endpoint
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        const { refreshToken, setTokens, clearTokens } =
          useAuthStore.getState();

        if (!refreshToken) {
          clearTokens();
          // Use router instead of window.location to avoid full refresh
          return Promise.reject(error);
        }

        // Call refresh endpoint
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          { refresh_token: refreshToken },
        );

        // Update tokens
        setTokens(data.accessToken, data.refreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        useAuthStore.getState().clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
