import GroupChannel from "./GroupChannel";
import User from "./User";

export default class Message {
    id: number;
    content: string;
    group: GroupChannel;
    user: User;
    createdAt: Date;

    constructor(
        id: number,
        content: string,
        group: GroupChannel,
        user: User,
        createdAt: Date | string,
    ) {
        this.id = id
        this.content = content
        this.group = group
        this.user = user
        this.createdAt = typeof createdAt === 'string'
            ? new Date(createdAt)
            : createdAt
    }
}