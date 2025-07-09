export default interface UpdateProfileDto extends Record<string, string | File[]> {
    avatar: File[];
    firstname: string;
    lastname: string;
    bio: string;
    dob: string;
}