import Channel from "./Channel";
import User from "./User";

export default class ChannelMember extends Channel {
    role: number;
    createdAt: string;

    constructor(
        id: number,
        name: string,
        key: string,
        status: number,
        user: User,
        role: number,
        createdAt: string
    ) {
        super(id, name, key, status, user)
        this.role = role;
        this.createdAt = createdAt;
    }
}