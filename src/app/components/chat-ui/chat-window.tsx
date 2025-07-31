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
import { TEXT_CHAT } from "@/constants/type";
import { FileService } from "@/services/file.service";
import IChatMessage from "@/dto/ws/message/message";
import MessageConfirmFiles from "./modal/message-confirm-files";
import Message from "@/models/Message";
import { useUserStore } from "@/stores/profile";
import FileBody from "@/dto/common/fiile.request";

export default function ChatWindow() {
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const currentUser = useUserStore((state) => state.item);
    const selectedGroupChannel = useGroupChannelStore((state) => state.selectedGroupChannel);
    const messages = useMessageStore((state) => state.items);
    const addMessage = useMessageStore((state) => state.addItem);
    const [profile, setProfile] = useState('');
    const [fullname, setFullname] = useState('');
    const [messageType, setMessageType] = useState(TEXT_CHAT);
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [showSendFiles, setShowSendFiles] = useState(false);

    useEffect(() => {
        if (selectedGroupChannel) {
            const channel = selectedGroupChannel.channel;
            setProfile(selectedGroupChannel.group ? selectedGroupChannel.photo : channel?.user.avatar);
            setFullname(selectedGroupChannel.group ? selectedGroupChannel.name : channel?.user.firstname + ' ' + channel?.user.lastname);
        }
    }, [selectedGroupChannel])

    // When the user sends a new message, append it
    const handleSend = useCallback(
        (text: string) => {
            const message: IChatMessage = {
                text,
            }
            addMessage(Message.from(message, currentUser!));
            sendChatMessage(TEXT_CHAT, message, selectedGroupChannel);
        },
        [addMessage, currentUser, selectedGroupChannel]
    );

    const goDetail = () => {
        setTypeWindow(CHAT_DETAIL);
    };

    const handleSendFiiles = useCallback(
        (text: string, files: File[]) => {
            const message: IChatMessage = {
                text,
                files: files && files.length > 0 ? JSON.stringify(files.map(f => {
                    const file: FileBody = {
                        uri: URL.createObjectURL(f),
                        name: f.name,
                        type: f.type
                    };
                    return file;
                })) : ''
            }
            addMessage(Message.from(message, currentUser!));
            FileService.uploadFile({
                files: files,
                m_type: messageType
            }).then(res => {
                message.files = res.data && res.data.length > 0 ? JSON.stringify(res.data) : ''
                sendChatMessage(messageType, message, selectedGroupChannel);
                setUploadFiles([]);
            }).catch(e => {
                console.error(e);
            }).finally(() => {
                setShowSendFiles(false);
            })
        },
        [addMessage, currentUser, messageType, selectedGroupChannel]
    );

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
                <ChatInput
                    onSend={handleSend}
                    setSelectedFiles={setUploadFiles}
                    setMessageType={setMessageType}
                    setShowSendFiles={setShowSendFiles}
                />
            </div>
            <MessageConfirmFiles
                type={messageType}
                show={showSendFiles}
                uploadFiles={uploadFiles}
                onSend={handleSendFiiles}
                onClose={() => setShowSendFiles(false)}
            />
        </div>
    );
}
