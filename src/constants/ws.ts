export const WS_DOMAIN = process.env.NEXT_PUBLIC_WS_DOMAIN || 'ws://localhost:8080/ws';

export const WS_ENDPOINTS = {
    AUTH: {
        SUB: "/channel/auth/",
        PUB: "/app/channel/auth/"
    },
    ONLINE: {
        SUB: (user_key: string) => "/channel/" + user_key + "/online",
        PUB: (user_key: string) => "/app/channel/" + user_key + "/connect",
    }
};