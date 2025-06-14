// src/constants/api.ts

/**
 * Domain and API endpoint constants
 *
 * - Configure via environment variables (NEXT_PUBLIC_API_DOMAIN, NEXT_PUBLIC_API_PATH)
 * - Fallback to development defaults
 */
export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:8080";

export const API_PATH = process.env.NEXT_PUBLIC_API_PATH || "";

/**
 * Base URL for all API requests
 */
export const API_BASE_URL = `${API_DOMAIN}${API_PATH}`;

/**
 * Individual endpoints
 */
export const ENDPOINTS = {
    auth: {
        login: `${API_BASE_URL}/login`,
        logout: `${API_BASE_URL}/logout`,
        register: `${API_BASE_URL}/register`,
    },
    user: {
        profile: `${API_BASE_URL}/api/user/profile`,
    },
    users: `${API_BASE_URL}/users`,
};
