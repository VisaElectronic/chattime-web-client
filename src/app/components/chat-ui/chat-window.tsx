// src/components/ChatWindow.jsx
import React, { useCallback } from "react";
import ChatHeader from "./chat-header";
import MessageList from "./message-list";
import ChatInput from "./chat-input";
import { useMessageStore } from "@/stores/message-store";
import { sendChatMessage } from "@/lib/stomp";
import { useGroupChannelStore } from "@/stores/group-channel";

// Dummy avatar URLs for header (replace with your own)
const dummyHeaderAvatars = [
    "https://i.pravatar.cc/40?img=5",
];

export default function ChatWindow() {
    const selectedGroupChannel = useGroupChannelStore((state) => state.selectedGroupChannel);
    const messages = useMessageStore((state) => state.items);

    // When the user sends a new message, append it
    const handleSend = useCallback(
        (text: string) => {
            console.log('send message');
            sendChatMessage(text, selectedGroupChannel);
        },
        [selectedGroupChannel]
    );

    return (
        <div className="flex flex-col h-screen w-full">
            {/* 1. Header — fixed height */}
            <div className="flex-none">
                <ChatHeader title="Social Demo" avatars={dummyHeaderAvatars} />
            </div>

            {/* 2. Message List — flex & scroll */}
            <div className="flex-1 overflow-y-auto bg-gray-900">
                <MessageList
                messages={messages}
                />
            </div>

            {/* 3. Input — fixed height */}
            <div className="flex-none">
                <ChatInput onSend={handleSend} />
            </div>
        </div>
    );
}
