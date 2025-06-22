import { ENDPOINTS } from "@/constants/api";
import APIResponse from "@/dto/response";
import { Http } from "@/utils/http";

type UploadParams = {
    files: File[]
}

export class FileService {
    static async upload(body: UploadParams): Promise<boolean> {
        const res = await Http.postForm<APIResponse<boolean>>(ENDPOINTS.file.upload, body);
        return res.data;
    }
}
