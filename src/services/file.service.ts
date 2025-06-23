import { ENDPOINTS } from "@/constants/api";
import APIResponse from "@/dto/response";
import { Http } from "@/utils/http";

type UploadParams = {
    files: File[]
}

type UploadResponse = {
    path: string
}

export class FileService {
    static async upload(body: UploadParams): Promise<UploadResponse> {
        const res = await Http.postForm<APIResponse<UploadResponse>>(ENDPOINTS.file.upload, body);
        return res.data;
    }
}
