export interface RegisterOTPDto extends Record<string, string | undefined>{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    identifier: string;
}