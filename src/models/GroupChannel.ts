import Channel from "./Channel";

export default class GroupChannel {
    id: number;
    key: string;
    name: string;
    customFirstname: string;
    customLastname: string;
    group: boolean;
    photo: string;
    channel: Channel;
    channels: Channel[];

    constructor(
        id: number,
        key: string,
        name: string,
        customFirstname: string,
        customLastname: string,
        group: boolean,
        photo: string,
        channel: Channel,
        channels: Channel[]
    ) {
        this.id = id
        this.key = key
        this.name = name
        this.customFirstname = customFirstname
        this.customLastname = customLastname
        this.group = group
        this.photo = photo
        this.channel = channel
        this.channels = channels
    }
}