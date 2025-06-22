import { ENDPOINTS } from "@/constants/api";
import APIResponse from "@/dto/response";
import Channel from "@/models/Channel";
import GroupChannel from "@/models/GroupChannel";
import { Http } from "@/utils/http";

type SearchChannelParams = {
    search: string
}

export interface ContactData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export class ContactService {
    /** POST /api/auth/login */
    static async searchChannel({ search }: SearchChannelParams): Promise<Channel[]> {
        const res = await Http.get<APIResponse<Channel[]>>(ENDPOINTS.contact.search + '?search=' + search);
        return res.data;
    }

    static async addContact(data: ContactData): Promise<APIResponse<GroupChannel>> {
        const res = await Http.post<APIResponse<GroupChannel>>(ENDPOINTS.contact.store, data, {
            'Content-Type': 'application/json',
        });
        return res;
    }
}
