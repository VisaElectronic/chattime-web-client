export default class User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    key: string;
    firstname: string;
    lastname: string;
    phone: string;
    dob: string;
    bio: string;

    constructor(
        id: number,
        username: string,
        email: string,
        avatar: string,
        key: string,
        firstname: string,
        lastname: string,
        phone: string,
        dob: string,
        bio: string
    ) {
        this.id = id
        this.username = username
        this.email = email
        this.avatar = avatar
        this.key = key
        this.firstname = firstname
        this.lastname = lastname
        this.phone = phone
        this.dob = dob
        this.bio = bio
    }
}