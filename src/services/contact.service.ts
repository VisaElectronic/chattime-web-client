import { ENDPOINTS } from "@/constants/api";
import APIResponse from "@/dto/response";
import Channel from "@/models/Channel";
import { Http } from "@/utils/http";

type SearchChannelParams = {
    search: string
}

export class ContactService {
    /** POST /api/auth/login */
    static async searchChannel({ search }: SearchChannelParams): Promise<Channel[]> {
        const res = await Http.get<APIResponse<Channel[]>>(ENDPOINTS.contact.search + '?search=' + search);
        return res.data;
    }
}
