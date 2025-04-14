// API constants
export const BASE_URL = "http://127.0.0.1:8000";

// Endpoints
export const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  PROFILES: `${BASE_URL}/users/profiles`,
  AUTH: {
    TOKEN: `${BASE_URL}/auth/jwt/create/`,
    REFRESH: `${BASE_URL}/auth/jwt/refresh/`,
    VERIFY: `${BASE_URL}/auth/jwt/verify/`,
    USERS: `${BASE_URL}/auth/users/`,
    ME: `${BASE_URL}/auth/users/me/`,
    ACTIVATION: `${BASE_URL}/auth/users/activation/`, // Confirm this matches your Django/Djoser endpoint
    RESET_PASSWORD: `${BASE_URL}/auth/users/reset_password/`,
    RESET_PASSWORD_CONFIRM: `${BASE_URL}/auth/users/reset_password_confirm/`,
  },
  CAMPAIGNS: `${BASE_URL}/campaigns`,
  DONATIONS: `${BASE_URL}/donations`,
  CATEGORIES: `${BASE_URL}/categories`,
  TAGS: `${BASE_URL}/tags`,
  COMMENTS: `${BASE_URL}/comments`,
  RATINGS: `${BASE_URL}/ratings`,
  REPORTS: `${BASE_URL}/reports`,
  CAMPAIGN_IMAGES: `${BASE_URL}/campaign-images`,
  LATEST_CAMPAIGNS: `${BASE_URL}/latest-campaigns`,

  // Add this for frontend URLs
  FRONTEND: {
    ACTIVATION: "/activate",
    USER_ACTIVATION: "/users/activate",
  },
};
