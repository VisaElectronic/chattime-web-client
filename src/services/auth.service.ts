// src/services/auth.service.ts

import { ENDPOINTS } from "@/constants/api";
import { Http } from "@/utils/http";
import LoginResponse from "@/dto/auth/login.response";
import RegisterResponse from "@/dto/auth/register.response";
import { RegisterOTPDto } from "@/dto/auth/register-otp.request";
import APIResponse from "@/dto/response";
import { RegisterVerifyOTPDto } from "@/dto/auth/register-verify.request";
import { RegisterOTPResponseDto } from "@/dto/auth/register-otp.response";
import { RegisterResendOTPDto } from "@/dto/auth/register-resend.request";
import { ForgotPasswordDto } from "@/dto/auth/forgot-password.request";
import { ResetPasswordDto } from "@/dto/auth/reset-password.request";

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
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', access_token);
    }

    static removeAuthToken() {
        localStorage.removeItem('access_token');
    }

    static getAuthToken() {
        return localStorage.getItem('access_token');
    }

    static registerOtp(data: RegisterOTPDto): Promise<APIResponse<RegisterOTPResponseDto>> {
        return Http.postForm<APIResponse<RegisterOTPResponseDto>>(ENDPOINTS.auth.register, data);
    }

    static registerVerify(data: RegisterVerifyOTPDto): Promise<APIResponse<string>> {
        return Http.postForm<APIResponse<string>>(ENDPOINTS.auth.registerVerify, data);
    }

    static registerResend(data: RegisterResendOTPDto): Promise<APIResponse<RegisterOTPResponseDto>> {
        return Http.postForm<APIResponse<RegisterOTPResponseDto>>(ENDPOINTS.auth.registerResend, data);
    }

    static forgotPassword(data: ForgotPasswordDto): Promise<APIResponse<RegisterOTPResponseDto>> {
        return Http.postForm<APIResponse<RegisterOTPResponseDto>>(ENDPOINTS.auth.forgotPassword, data);
    }

    static resetPassword(data: ResetPasswordDto): Promise<APIResponse<RegisterOTPResponseDto>> {
        return Http.postForm<APIResponse<RegisterOTPResponseDto>>(ENDPOINTS.auth.resetPassword, data);
    }
}
