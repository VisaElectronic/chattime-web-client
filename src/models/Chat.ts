import GroupChannel from "./GroupChannel";
import User from "./User";

export default class Chat {
    id: number;
    content: string;
    group: GroupChannel;
    user: User;
    createdAt: string;

    constructor(
        id: number,
        content: string,
        group: GroupChannel,
        user: User,
        createdAt: string,
    ) {
        this.id = id
        this.content = content
        this.group = group
        this.user = user
        this.createdAt = createdAt
    }
}