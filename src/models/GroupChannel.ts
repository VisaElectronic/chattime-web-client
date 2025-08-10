import Channel from "./Channel";
import Message from "./Message";

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
    lastMessage: Message;
    unread: number;
    displayOrder: number;

    constructor(
        id: number,
        key: string,
        name: string,
        customFirstname: string,
        customLastname: string,
        group: boolean,
        photo: string,
        channel: Channel,
        channels: Channel[],
        lastMessage: Message,
        unread: number,
        displayOrder: number
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
        this.lastMessage = lastMessage
        this.unread = unread
        this.displayOrder = displayOrder
    }
}