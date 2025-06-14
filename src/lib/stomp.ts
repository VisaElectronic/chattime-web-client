import { WS_DOMAIN, WS_ENDPOINTS } from '@/constants/ws'
import WSResponse from '@/dto/ws/response';
import { Client, IMessage, Frame } from '@stomp/stompjs'
import { v4 as uuidv4 } from "uuid";
import User from '@/models/User';
import GroupChannel from '@/models/GroupChannel';
import { useGroupChannelStore } from '@/stores/group-channel';
import { LOGIN_ROUTE } from '@/constants/routes';
import { useMessageStore } from '@/stores/message-store';

let stompClient: Client | null = null

export function connectStomp(access_token: string) {
    if (typeof window === 'undefined') return

    // If already connected, do nothing
    if (stompClient && stompClient.active) return

    stompClient = new Client({
        // Replace with your WebSocket endpoint
        brokerURL: WS_DOMAIN,
        connectHeaders: {
            // If your backend expects an Authorization header
            Authorization: `Bearer ${access_token}`,
        },
        // Optional: enable logging
        debug: (str) => {
            console.debug('[STOMP]', str)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    })

    stompClient.onConnect = (frame: Frame) => {
        console.log('STOMP connected:', frame)
        const ws_id: string = uuidv4();
        // Example: subscribe to a topic
        stompClient?.subscribe(WS_ENDPOINTS.AUTH.SUB + ws_id, (message: IMessage) => {
            const body: WSResponse<User> = message.body ? JSON.parse(message.body) : null;
            console.log('Received message:', body)
            if(body.data as unknown === 'token_expired') window.location.href = LOGIN_ROUTE;
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
        const body: WSResponse<GroupChannel[]> = message.body ? JSON.parse(message.body) : null;
        console.log('Received message:', body)
        useGroupChannelStore.getState().addItems(body.data);
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
    stompClient?.subscribe(WS_ENDPOINTS.CONNECT_CHAT.SUB(groupChannel.key), (message: IMessage) => {
        const body = message.body ? JSON.parse(message.body) : null;
        console.log('Received message:', body)
        useMessageStore.getState().addItems(body.data);
        connectToChat(groupChannel);
    })
    sendWSMessage(
        WS_ENDPOINTS.CONNECT_CHAT.PUB(groupChannel.key),
        {
            isGroup: groupChannel.channel ? false : true
        }
    )
}

export function connectToChat(groupChannel: GroupChannel) {
    stompClient?.subscribe(WS_ENDPOINTS.CHAT.SUB(groupChannel.key), (message: IMessage) => {
        const body = message.body ? JSON.parse(message.body) : null;
        console.log('Received message:', body)
        useMessageStore.getState().addItem(body.data);
    })
}

export function sendChatMessage(text: string, groupChannel?: GroupChannel) {
    if(!groupChannel) {
        console.error('No Channel');
        return;
    }
    sendWSMessage(
        WS_ENDPOINTS.CHAT.PUB(groupChannel.key),
        {
            content: text,
            type: 'TEXT',
        }
    )
}