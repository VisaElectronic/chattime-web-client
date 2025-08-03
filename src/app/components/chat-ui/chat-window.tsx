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
import { TEXT_CHAT, VOICE_CHAT } from "@/constants/type";
import { FileService } from "@/services/file.service";
import IChatMessage from "@/dto/ws/message/message";
import MessageConfirmFiles from "./modal/message-confirm-files";
import FileBody from "@/dto/common/fiile.request";
import Loading from "@/components/commons/loading";

export default function ChatWindow() {
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const selectedGroupChannel = useGroupChannelStore((state) => state.selectedGroupChannel);
    const messages = useMessageStore((state) => state.items);
    const [profile, setProfile] = useState('');
    const [fullname, setFullname] = useState('');
    const [messageType, setMessageType] = useState(TEXT_CHAT);
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [showSendFiles, setShowSendFiles] = useState(false);
    const [loading, setLoading] = useState(false);

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
            sendChatMessage(TEXT_CHAT, message, selectedGroupChannel);
        },
        [selectedGroupChannel]
    );

    const goDetail = () => {
        setTypeWindow(CHAT_DETAIL);
    };

    const handleSendFiles = useCallback(
        (text: string | null, files: File[], type?: number) => {
            setLoading(true);
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
            FileService.uploadFile({
                files: files,
                m_type: type ? type : messageType
            }).then(res => {
                message.files = res.data && res.data.length > 0 ? JSON.stringify(res.data) : ''
                sendChatMessage(type ? type : messageType, message, selectedGroupChannel);
                setUploadFiles([]);
            }).catch(e => {
                console.error(e);
            }).finally(() => {
                setShowSendFiles(false);
                setLoading(false);
            })
        },
        [messageType, selectedGroupChannel]
    );

    const onSendVoiceFile = useCallback((files: File[]) => {
        handleSendFiles(null, files, VOICE_CHAT);
    }, [handleSendFiles]);

    return (
        <>
            {loading && <Loading />}
            <div className="flex flex-col h-screen w-full">
                {/* 1. Header — fixed height */}
                <div className="flex-none cursor-pointer">
                    <ChatHeader title={fullname} avatars={[profile]} goDetail={goDetail}/>
                </div>

                {/* 2. Message List — flex & scroll */}
                <div className="flex-1 overflow-y-auto dark:bg-gray-900">
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
                        onSendVoiceFile={onSendVoiceFile}
                    />
                </div>
                <MessageConfirmFiles
                    type={messageType}
                    show={showSendFiles}
                    uploadFiles={uploadFiles}
                    onSend={handleSendFiles}
                    onClose={() => setShowSendFiles(false)}
                />
            </div>
        </>
    );
}
