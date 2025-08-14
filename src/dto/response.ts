export default interface APIResponse<T> {
    data: T;
    success: boolean;
    message: string;
}