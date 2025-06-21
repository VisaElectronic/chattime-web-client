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
        login: `${API_DOMAIN}/login`,
        logout: `${API_DOMAIN}/logout`,
        register: `${API_DOMAIN}/register`,
    },
    user: {
        profile: `${API_BASE_URL}/user/profile`,
    },
    contact: {
        search: `${API_BASE_URL}/contacts/search`,
    }
};
