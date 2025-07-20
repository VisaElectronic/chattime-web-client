import { ENDPOINTS } from "@/constants/api";
import CreateGroupDto from "@/dto/group/group.request";
import RemoveMemberDto from "@/dto/group/remove-member.request";
import UpdateGroupDto from "@/dto/group/update-group.request";
import APIResponse from "@/dto/response";
import ChannelMember from "@/models/ChannelMember";
import GroupChannel from "@/models/GroupChannel";
import { Http } from "@/utils/http";

type SearchChannelParams = {
    type: string,
    search?: string
}

export class GroupService {
    static async createGroup(data: CreateGroupDto): Promise<APIResponse<GroupChannel>> {
        const res = await Http.postForm<APIResponse<GroupChannel>>(ENDPOINTS.group.create, data);
        return res;
    }

    static async getInfo(group_key: string, { type }: SearchChannelParams): Promise<ChannelMember[]> {
        const res = await Http.get<APIResponse<ChannelMember[]>>(ENDPOINTS.group.detail(group_key) + '?type=' + type);
        return res.data;
    }

    static async updateGroup(group_key: string, data: UpdateGroupDto): Promise<APIResponse<GroupChannel>> {
        const res = await Http.postForm<APIResponse<GroupChannel>>(ENDPOINTS.group.update(group_key), data);
        return res;
    }

    static async removeGroupMember(group_key: string, data: RemoveMemberDto): Promise<APIResponse<GroupChannel>> {
        const res = await Http.deleteForm<APIResponse<GroupChannel>>(ENDPOINTS.group.removeMember(group_key), data);
        return res;
    }
}