import { ENDPOINTS } from "@/constants/api";
import FetchMessagesParams from "@/dto/message/index.request";
import APIResponse from "@/dto/response";
import Message from "@/models/Message";
import { Http } from "@/utils/http";

export default class MessageService {
    static async index(
        { groupId, limit, offset }: FetchMessagesParams
    ): Promise<APIResponse<Message[]>> {
        const res = await Http.get<APIResponse<Message[]>>(
            ENDPOINTS.message.index + '?groupId=' + groupId + '&limit=' + limit + '&offset=' + offset
        );
        return res;
    }
}