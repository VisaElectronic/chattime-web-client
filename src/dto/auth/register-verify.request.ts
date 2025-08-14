export interface RegisterVerifyOTPDto extends Record<string, string>{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    identifier: string;
    otpCode: string;
}