export default interface UploadFileRequest extends Record<string, File[] | number> {
    files: File[],
    m_type: number
}