import User from "@/models/User";
import APIResponse from "../response";

export default interface LoginResponse extends APIResponse<LoginResponse> { 
    accessToken: string; 
    profile: User;
}