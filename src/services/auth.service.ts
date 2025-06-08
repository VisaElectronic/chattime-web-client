// src/services/auth.service.ts

import { ENDPOINTS } from "@/constants/api";
import { Http } from "@/utils/http";
import LoginResponse from "@/dto/auth/login.response";

export interface LoginPayload { email: string; password: string }

export class AuthService {
    /** POST /api/auth/login */
    static login(data: LoginPayload): Promise<LoginResponse> {
        return Http.post<LoginResponse>(ENDPOINTS.auth.login, data);
    }

    /** POST /api/auth/logout */
    static logout(): Promise<void> {
        return Http.post<void>(ENDPOINTS.auth.logout, null);
    }

    static storeAuthToken(access_token: string) {
        localStorage.setItem('access_token', access_token);
    }

    static removeAuthToken() {
        localStorage.removeItem('access_token');
    }

    static getAuthToken() {
        return localStorage.getItem('access_token');
    }
}
