import { AuthService } from "@/services/auth.service";

export class Http {
    /**
     * Retrieve the authorization header if an accessToken exists in localStorage
     */
    private static getAuthHeader(): Record<string, string> {
        if (typeof window === 'undefined') return {};
        const token = AuthService.getAuthToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    /**
     * Core request method that injects the auth header
     */
    private static async request<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        // Extract existing headers (if any)
        const existingHeaders: Record<string, string> =
            options.headers instanceof Headers
                ? Object.fromEntries(options.headers.entries())
                : (options.headers as Record<string, string>) || {};

        // Merge headers: existing + auth
        const headers = {
            ...this.getAuthHeader(),
            ...existingHeaders,
        };

        // Perform fetch
        const res = await fetch(url, {
            ...options,
            headers,
        });

        // Try to parse JSON body
        let payload = null;
        try {
            payload = await res.json();
        } catch {
            // No JSON
        }

        if (!res.ok) {
            const message =
                payload?.message || payload?.error || res.statusText || 'Request failed';
            throw new Error(message);
        }

        return payload;
    }

    /**
     * GET request
     */
    static get<T>(
        url: string,
        params?: Record<string, string | number>,
        headers: Record<string, string> = {}
    ): Promise<T> {
        const qs = params
            ? `?${new URLSearchParams(
                Object.entries(params).map(([k, v]) => [k, String(v)])
            ).toString()}`
            : '';
        return this.request<T>(url + qs, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        });
    }

    /**
     * POST request
     */
    static post<T>(
        url: string,
        body: unknown,
        headers: Record<string, string> = {}
    ): Promise<T> {
        return this.request<T>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        });
    }
}
