import Channel from "./Channel";

export default class GroupChannel {
    id: number;
    key: string;
    channels: Channel[];

    constructor(
        id: number,
        key: string,
        channels: Channel[]
    ) {
        this.id = id
        this.key = key
        this.channels = channels
    }
}