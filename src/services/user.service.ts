// src/services/auth.service.ts

import { ENDPOINTS } from "@/constants/api";
import APIResponse from "@/dto/response";
import User from "@/models/User";
import { Http } from "@/utils/http";

export class UserService {
    /** POST /api/auth/login */
    static async fetchProfile(): Promise<User> {
        const res = await Http.get<APIResponse<User>>(ENDPOINTS.user.profile);
        return res.data;
    }
}
