import { ENDPOINTS } from "@/constants/api";
import APIResponse from "@/dto/response";
import UpdateProfileDto from "@/dto/user/update-profile.request";
import User from "@/models/User";
import { Http } from "@/utils/http";

export class UserService {
    /** POST /api/auth/login */
    static async fetchProfile(): Promise<User> {
        const res = await Http.get<APIResponse<User>>(ENDPOINTS.user.profile);
        return res.data;
    }

    static async updateProfile(body: UpdateProfileDto): Promise<User> {
        const res = await Http.postForm<APIResponse<User>>(ENDPOINTS.user.profile, body);
        return res.data;
    }
}
