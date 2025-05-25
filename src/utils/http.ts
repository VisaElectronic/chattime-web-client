export class Http {
    private static async request<T>(
        url: string,
        options: RequestInit
    ): Promise<T> {
        const res = await fetch(url, options);
        let payload = null;

        try {
            payload = await res.json();
        } catch {
            // no JSON body
        }

        if (!res.ok) {
            const message =
                payload?.message || payload?.error || res.statusText || "Request failed";
            throw new Error(message);
        }

        return payload as T;
    }

    /**
     * GET request
     * @param url     endpoint URL (can include basePath)
     * @param params  query params object
     * @param headers additional headers
     */
    static get<T>(
        url: string,
        params?: Record<string, string | number>,
        headers?: Record<string, string>
    ): Promise<T> {
        const qs = params
            ? "?" + new URLSearchParams(
                Object.entries(params).map(([k, v]) => [k, String(v)])
            ).toString()
            : "";
        return this.request<T>(url + qs, {
            method: "GET",
            headers,
        });
    }

    /**
     * POST request
     * @param url     endpoint URL
     * @param body    JSON-serializable payload
     * @param headers additional headers
     */
    static post<T>(
        url: string,
        body: unknown,
        headers?: Record<string, string>
    ): Promise<T> {
        return this.request<T>(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(headers || {}),
            },
            body: JSON.stringify(body),
        });
    }
}
