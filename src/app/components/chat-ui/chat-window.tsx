// src/components/ChatWindow.jsx
import React, { useCallback, useEffect, useState } from "react";
import ChatHeader from "./chat-header";
import MessageList from "./message-list";
import ChatInput from "./chat-input";
import { useMessageStore } from "@/stores/message-store";
import { sendChatMessage } from "@/lib/stomp";
import { useGroupChannelStore } from "@/stores/group-channel";
import { useWindowContentStore } from "@/stores/window-content";
import { CHAT_DETAIL } from "@/constants/window";

export default function ChatWindow() {
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const selectedGroupChannel = useGroupChannelStore((state) => state.selectedGroupChannel);
    const messages = useMessageStore((state) => state.items);
    const [profile, setProfile] = useState('');
    const [fullname, setFullname] = useState('');

    useEffect(() => {
        if(selectedGroupChannel) {
            const channel = selectedGroupChannel.channel;
            setProfile(selectedGroupChannel.group ? selectedGroupChannel.photo : channel?.user.avatar);
            setFullname(selectedGroupChannel.group ? selectedGroupChannel.name : channel?.user.firstname + ' ' + channel?.user.lastname);
        }
    }, [selectedGroupChannel])

    // When the user sends a new message, append it
    const handleSend = useCallback(
        (text: string) => {
            console.log('send message');
            sendChatMessage(text, selectedGroupChannel);
        },
        [selectedGroupChannel]
    );

    const goDetail = () => {
        setTypeWindow(CHAT_DETAIL);
    };

    return (
        <div className="flex flex-col h-screen w-full">
            {/* 1. Header — fixed height */}
            <div className="flex-none cursor-pointer" onClick={goDetail}>
                <ChatHeader title={fullname} avatars={[profile]} />
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
