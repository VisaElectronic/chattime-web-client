import { ENDPOINTS } from "@/constants/api";
import FileBody from "@/dto/common/fiile.request";
import UploadFileRequest from "@/dto/file/upload-file.request";
import APIResponse from "@/dto/response";
import { Http } from "@/utils/http";

export class FileService {
    static async uploadFile(body: UploadFileRequest): Promise<APIResponse<FileBody[]>> {
        const res = await Http.postForm<APIResponse<FileBody[]>>(ENDPOINTS.file.upload, body);
        return res;
    }
}
