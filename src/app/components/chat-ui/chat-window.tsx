import React, { useCallback, useEffect, useRef, useState } from "react";
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
import FetchMessagesParams from "@/dto/message/index.request";
import MessageService from "@/services/message.service";

export default function ChatWindow() {
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const selectedGroupChannel = useGroupChannelStore((state) => state.selectedGroupChannel);
    const messages = useMessageStore((state) => state.items);
    const currentOffset = useMessageStore((state) => state.currentOffset);
    const setCurrentOffset = useMessageStore((state) => state.setCurrentOffset);
    const appendMessages = useMessageStore((state) => state.appendMessages);
    const [profile, setProfile] = useState('');
    const [fullname, setFullname] = useState('');
    const [messageType, setMessageType] = useState(TEXT_CHAT);
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [showSendFiles, setShowSendFiles] = useState(false);
    const [loading, setLoading] = useState(false);
    const [, setIsFetchingMore] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scrollToBottom, setScrollToBottom] = useState(true);

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

    const onFetchMessages = useCallback(async () => {
        setIsFetchingMore(true);
        try {
            const offset = (currentOffset) * 11;
            const params: FetchMessagesParams = {
                groupId: selectedGroupChannel!.key,
                limit: 11,
                offset: offset
            };
            const res = await MessageService.index(params);
            appendMessages(res.data);
            setCurrentOffset(currentOffset + 1)
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetchingMore(false);
            setIsLoading(false);
        }
    }, [appendMessages, currentOffset, selectedGroupChannel, setCurrentOffset]);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (container && container.scrollTop === 0 && !isLoading) {
                setIsLoading(true);
                setScrollToBottom(false);
                onFetchMessages();
            }
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isLoading, onFetchMessages]);

    useEffect(() => {
        if (selectedGroupChannel) {
            const channel = selectedGroupChannel.channel;
            setProfile(selectedGroupChannel.group ? selectedGroupChannel.photo : channel?.user.avatar);
            setFullname(selectedGroupChannel.group ? selectedGroupChannel.name : channel?.user.firstname + ' ' + channel?.user.lastname);
        }
    }, [selectedGroupChannel])

    useEffect(() => {
        const fetchMessages = async () => {
            if(!selectedGroupChannel) return;
            setIsFetchingMore(true);
            try {
                const params: FetchMessagesParams = {
                    groupId: selectedGroupChannel.key,
                    limit: 11,
                    offset: 0
                };
                const res = await MessageService.index(params);
                console.log('res', res);
                appendMessages(res.data);
                setCurrentOffset(1)
            } catch (err) {
                console.error(err);
            } finally {
                setIsFetchingMore(false);
            }
        }
        fetchMessages();
    }, [appendMessages, selectedGroupChannel, setCurrentOffset]);

    return (
        <>
            {loading && <Loading />}
            <div className="flex flex-col h-screen w-full">
                {/* 1. Header — fixed height */}
                <div className="flex-none cursor-pointer">
                    <ChatHeader title={fullname} avatars={[profile]} goDetail={goDetail} />
                </div>

                {/* 2. Message List — flex & scroll */}
                <div className="flex-1 overflow-y-auto dark:bg-gray-900" ref={containerRef}>
                    <MessageList
                        messages={messages}
                        scrollToBottom={scrollToBottom}
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
