import Channel from "./Channel";

export default class GroupChannel {
    id: number;
    key: string;
    channel: Channel;
    channels: Channel[];

    constructor(
        id: number,
        key: string,
        channel: Channel,
        channels: Channel[]
    ) {
        this.id = id
        this.key = key
        this.channel = channel
        this.channels = channels
    }
}