import GroupChannel from "./GroupChannel";
import User from "./User";

export default class Message {
    id: number;
    content: string;
    group: GroupChannel;
    user: User;
    createdAt: Date;
    files?: string;
    audio?: string;
    type: number;

    constructor(
        id: number,
        content: string,
        group: GroupChannel,
        user: User,
        createdAt: Date | string,
        files: string,
        audio: string,
        type: number
    ) {
        this.id = id
        this.content = content
        this.group = group
        this.user = user
        this.createdAt = typeof createdAt === 'string'
            ? new Date(createdAt)
            : createdAt;
        this.files = files
        this.audio = audio
        this.type = type
    }
}