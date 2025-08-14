export interface RegisterResendOTPDto extends Record<string, string>{
    email: string;
    identifier: string;
}