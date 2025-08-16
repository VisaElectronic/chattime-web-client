export interface ResetPasswordDto extends Record<string, string>{
    email: string;
    token: string;
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordQuery extends Record<string, string>{
    token: string;
    email: string;
}