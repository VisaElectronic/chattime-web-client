// src/services/auth.service.ts

import { ENDPOINTS } from "@/constants/api";
import { Http } from "@/utils/http";
import LoginResponse from "@/dto/auth/login.response";
import RegisterResponse from "@/dto/auth/register.response";

export interface LoginPayload { email: string; password: string }
export interface RegisterPayload extends Record<string, string>{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string
}

export class AuthService {
    /** POST /api/auth/login */
    static login(data: LoginPayload): Promise<LoginResponse> {
        return Http.post<LoginResponse>(ENDPOINTS.auth.login, data, {
            'Content-Type': 'application/json',
        });
    }

    /** POST /api/auth/logout */
    static logout(): Promise<void> {
        return Http.post<void>(ENDPOINTS.auth.logout, null);
    }

    static register(data: RegisterPayload): Promise<RegisterResponse> {
        return Http.postForm<RegisterResponse>(ENDPOINTS.auth.register, data);
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
