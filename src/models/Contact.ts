import Channel from "./Channel";

export default class Contact {
    id: number;
    key: string;
    customFirstname: string;
    customLastname: string;
    channel: Channel;

    constructor(
        id: number,
        key: string,
        customFirstname: string,
        customLastname: string,
        channel: Channel,
    ) {
        this.id = id
        this.key = key
        this.customFirstname = customFirstname
        this.customLastname = customLastname
        this.channel = channel
    }
}