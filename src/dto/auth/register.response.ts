import APIResponse from "../response";

export default interface RegisterResponse extends APIResponse<RegisterResponse> { 
    id: number;
    username: string;
    email: string; 
}