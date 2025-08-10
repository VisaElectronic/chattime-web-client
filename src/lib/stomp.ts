import { WS_CONNECTION_TYPES, WS_DOMAIN, WS_ENDPOINTS } from '@/constants/ws'
import WSResponse from '@/dto/ws/response';
import { Client, IMessage, Frame, StompSubscription } from '@stomp/stompjs'
import { v4 as uuidv4 } from "uuid";
import User from '@/models/User';
import GroupChannel from '@/models/GroupChannel';
import { useGroupChannelStore } from '@/stores/group-channel';
import { LOGIN_ROUTE } from '@/constants/routes';
import { useMessageStore } from '@/stores/message-store';
import OnlineResponse from '@/dto/ws/group-channel/online';
import IChatMessage from '@/dto/ws/message/message';

let stompClient: Client | null = null
let chatChannelSub: StompSubscription | undefined;
let chatSub: StompSubscription | undefined;

export function connectStomp(access_token: string) {
    if (typeof window === 'undefined') return

    // If already connected, do nothing
    if (stompClient && stompClient.active) return

    stompClient = new Client({
        // Replace with your WebSocket endpoint
        brokerURL: WS_DOMAIN,
        // connectHeaders: {
        //     // If your backend expects an Authorization header
        //     Authorization: `Bearer ${access_token}`,
        // },
        // Optional: enable logging
        debug: (str) => {
            console.debug('[STOMP]', str)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 20000, // Client expects a message (or server ping) every 20 seconds
        heartbeatOutgoing: 10000, // Client sends a heartbeat (pong) every 10 seconds if idle
    })

    stompClient.onConnect = (frame: Frame) => {
        console.log('STOMP connected:', frame)
        const ws_id: string = uuidv4();
        stompClient?.subscribe(WS_ENDPOINTS.AUTH.SUB + ws_id, (message: IMessage) => {
            const body: WSResponse<User> = message.body ? JSON.parse(message.body) : null;
            console.log('Received message:', body)
            if (body.data as unknown === 'token_expired') window.location.href = LOGIN_ROUTE;
            connectToOnline(body);
        })
        sendWSMessage(
            WS_ENDPOINTS.AUTH.PUB + ws_id,
            {
                authToken: access_token
            }
        )
    }

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error:', frame.headers['message'])
        console.error('Detailed error:', frame.body)
    }

    stompClient.activate()
}

export function disconnectStomp() {
    if (stompClient) {
        stompClient.deactivate()
        stompClient = null
    }
}

export function sendWSMessage(destination: string, payload: unknown) {
    if (stompClient && stompClient.active) {
        stompClient.publish({
            destination,
            body: JSON.stringify(payload),
        })
    } else {
        console.warn('STOMP is not connected yet.')
    }
}

export function connectToOnline(res: WSResponse<User>) {
    stompClient?.subscribe(WS_ENDPOINTS.ONLINE.SUB(res.data.key), (message: IMessage) => {
        const body: WSResponse<OnlineResponse<GroupChannel[]>> = message.body ? JSON.parse(message.body) : null;
        console.log('Received OnlineResponse:', JSON.parse(message.body))
        if(body.data.type === WS_CONNECTION_TYPES.ONLINE.LIST_GROUPS) {
            useGroupChannelStore.getState().addItems(body.data.groups);
        } else if(body.data.type === WS_CONNECTION_TYPES.ONLINE.NOTIFY_GROUP) {
            console.log('Received OnlineResponse Notify:', body)
            const notifyGroup = body.data.groups[0] ?? null;
            if(notifyGroup) useGroupChannelStore.getState().addItem(notifyGroup);
        } else {
            console.log('Received Update Group:', body)
            const notifyGroup = body.data.groups[0] ?? null;
            if(notifyGroup) useGroupChannelStore.getState().updateGroupChannel(notifyGroup);
        }
    })
    sendWSMessage(
        WS_ENDPOINTS.ONLINE.PUB(res.data.key),
        {
            userId: res.data.id,
            channelId: res.data.key,
        }
    )
}

export function connectToChatChannel(groupChannel: GroupChannel) {
    if(chatChannelSub) disconnectChatChannel();
    chatChannelSub = stompClient?.subscribe(WS_ENDPOINTS.CONNECT_CHAT.SUB(groupChannel.key), (message: IMessage) => {
        const body = message.body ? JSON.parse(message.body) : null;
        console.log('Received message:', body)
        // useMessageStore.getState().addItems(body.data);
        connectToChat(groupChannel);
    })
    sendWSMessage(
        WS_ENDPOINTS.CONNECT_CHAT.PUB(groupChannel.key),
        {
            limit: 30,
            offset: 0
        }
    )
}

export function connectToChat(groupChannel: GroupChannel) {
    if(chatSub) disconnectChat();
    chatSub = stompClient?.subscribe(WS_ENDPOINTS.CHAT.SUB(groupChannel.key), (message: IMessage) => {
        const body = message.body ? JSON.parse(message.body) : null;
        console.log('Received message:', body)
        useMessageStore.getState().addItem(body.data);
    })
}

export function sendChatMessage(type: number, message: IChatMessage, groupChannel?: GroupChannel) {
    if (!groupChannel) {
        console.error('No Channel');
        return;
    }
    const body = {
        content: message.text ?? null,
        type,
        files: ''
    };
    if(message.files) {
        body.files = message.files;
    }
    sendWSMessage(
        WS_ENDPOINTS.CHAT.PUB(groupChannel.key),
        body
    )
}

export function disconnectChatChannel() {
    if (chatChannelSub) {
        chatChannelSub.unsubscribe();
    }
}

export function disconnectChat() {
    if (chatSub) {
        chatSub.unsubscribe();
    }
}