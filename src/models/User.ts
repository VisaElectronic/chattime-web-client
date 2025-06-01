export default class User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    key: string;

    constructor(
        id: number,
        username: string,
        email: string,
        avatar: string,
        key: string
    ) {
        this.id = id
        this.username = username
        this.email = email
        this.avatar = avatar
        this.key = key
    }
}