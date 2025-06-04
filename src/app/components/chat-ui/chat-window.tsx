// src/components/ChatWindow.jsx
import React, { useState, useCallback } from "react";
import ChatHeader from "./chat-header";
import MessageList from "./message-list";
import ChatInput from "./chat-input";

// Dummy avatar URLs for header (replace with your own)
const dummyHeaderAvatars = [
    "https://i.pravatar.cc/40?img=5",
    "https://i.pravatar.cc/40?img=6",
    "https://i.pravatar.cc/40?img=8",
    "https://i.pravatar.cc/40?img=12",
];

export default function ChatWindow({ currentUserId }) {
    // Example dummy messages; in real life, fetch from API or WebSocket
    const [messages, setMessages] = useState([
        {
            id: "1",
            userId: "alice",
            username: "noisy-heart-1",
            avatarUrl: "https://i.pravatar.cc/40?img=5",
            text: "Here’s a cute cat picture!",
            createdAt: new Date().toISOString(),
        },
        {
            id: "2",
            userId: "alice",
            username: "noisy-heart-1",
            avatarUrl: "https://i.pravatar.cc/40?img=5",
            text: "[cat image attached]",
            createdAt: new Date().toISOString(),
        },
        {
            id: "3",
            userId: "damp-sunset-4",
            username: "damp-sunset-4",
            avatarUrl: "https://i.pravatar.cc/40?img=6",
            text: "test",
            createdAt: new Date().toISOString(),
        },
        {
            id: "4",
            userId: "misty-cherry-0",
            username: "misty-cherry-0",
            avatarUrl: "https://i.pravatar.cc/40?img=8",
            text: "Hello",
            createdAt: new Date().toISOString(),
        },
    ]);

    // When the user sends a new message, append it
    const handleSend = useCallback(
        (text) => {
            const newMsg = {
                id: Date.now().toString(),
                userId: currentUserId,
                username: currentUserId, // or map to a friendly name
                avatarUrl: `https://i.pravatar.cc/40?u=${currentUserId}`,
                text,
                createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, newMsg]);
        },
        [currentUserId]
    );

    return (
        <div className="flex flex-col h-full w-full bg-discordDark">
            {/* 1. Header */}
            <ChatHeader title="Social Demo" avatars={dummyHeaderAvatars} />

            {/* 2. Message List (messages in state) */}
            <MessageList messages={messages} currentUserId={currentUserId} />

            {/* 3. Input */}
            <ChatInput onSend={handleSend} />
        </div>
    );
}
