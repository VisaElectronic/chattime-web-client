import APIResponse from "../response";

export default interface LoginResponse extends APIResponse<LoginResponse> { 
    accessToken: string; 
}