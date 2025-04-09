// API constants
export const BASE_URL = 'http://127.0.0.1:8000';

// Endpoints
export const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  PROFILES: `${BASE_URL}/profiles`,
  AUTH: {
    TOKEN: `${BASE_URL}/auth/jwt/create`,
    REFRESH: `${BASE_URL}/auth/jwt/refresh`,
    VERIFY: `${BASE_URL}/auth/jwt/verify`,
    USERS: `${BASE_URL}/auth/users`,
    ME: `${BASE_URL}/auth/users/me`,
  },
  CAMPAIGNS: `${BASE_URL}/campaigns`,
  DONATIONS: `${BASE_URL}/donations`,
  CATEGORIES: `${BASE_URL}/categories`,
  TAGS: `${BASE_URL}/tags`,
  COMMENTS: `${BASE_URL}/comments`,
  RATINGS: `${BASE_URL}/ratings`,
  REPORTS: `${BASE_URL}/reports`,
  CAMPAIGN_IMAGES: `${BASE_URL}/campaign-images`,
};
