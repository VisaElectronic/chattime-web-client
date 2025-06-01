import User from "./User";

export default class Channel {
    id: number;
    name: string;
    key: string;
    status: number;
    user: User;

    constructor(
        id: number,
        name: string,
        key: string,
        status: number,
        user: User,
    ) {
        this.id = id
        this.key = key
        this.name = name
        this.status = status
        this.user = user
    }
}