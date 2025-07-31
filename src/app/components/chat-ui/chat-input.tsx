// src/components/ChatInput.jsx
import { FILE_CHAT, IMAGE_CHAT } from "@/constants/type";
import { Dropdown, DropdownItem } from "flowbite-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { FiSmile, FiSend, FiMic, FiFile } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";

interface ChatInputProp {
    onSend: (text: string) => void
    setSelectedFiles: (files: File[]) => void
    setMessageType: (type: number) => void
    setShowSendFiles: (show: boolean) => void
}

export default function ChatInput({ 
    onSend,
    setSelectedFiles,
    setMessageType,
    setShowSendFiles
 }: ChatInputProp) {
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [accept, setAccept] = useState<null | string>(null);
    const [chooseFiles, setChooseFiles] = useState<boolean>(false);

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleDropdownClick = (type: string) => {
        setAccept(type === 'media' ? 'image/*,video/*' : '*/*');
        if(type === 'media') {
            setAccept('image/*,video/*');
            setMessageType(IMAGE_CHAT);
        } else {
            setAccept('*/*');
            setMessageType(FILE_CHAT);
        }
        setChooseFiles(true);
    };

    useEffect(() => {
        if(!chooseFiles) return;
        inputRef.current?.click();
        setChooseFiles(false);
    }, [chooseFiles])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files: File[] = [];
        for (const file of e.target.files) {
            files.push(file);
        }
        setSelectedFiles(files)
        setShowSendFiles(true);
        // setSelectedFiles(e.target.files);
        // reset so selecting the same file twice still fires change
        e.target.value = '';
    };

    return (
        <div className="basis-1/4 px-4 py-3 border-y-[0.01px] dark:border-y-[#656565] w-full dark:bg-gray-800">
            <div className="flex items-center space-x-2">
                <div className="px-2">
                    <input
                        type="file"
                        multiple
                        accept={accept ?? '*/*'}
                        ref={inputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <FaPaperclip className="h-5 w-5" />
                        }
                    >
                        <DropdownItem
                            icon={HiOutlinePhotograph}
                            onClick={() => handleDropdownClick('media')}
                        >
                            Photo or Video
                        </DropdownItem>
                        <DropdownItem
                            icon={FiFile}
                            onClick={() => handleDropdownClick('file')}
                        >
                            File
                        </DropdownItem>
                    </Dropdown>
                </div>

                <textarea
                    className="
                        flex-1 resize-none rounded-full bg-discordDark 
                        px-4 text-discordText placeholder-discordMuted 
                        border border-transparent focus:outline-none  
                        scrollbar-none
                    "
                    rows={1}
                    placeholder="Type your message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <div className="flex items-center space-x-2">
                    <button
                        className="px-2 text-discordMuted hover:text-discordText"
                        disabled={text.trim().length === 0}
                        onClick={() => onSend(text.trim())}
                    >
                        <FiSend
                            className={`${text.trim() ? "text-blue-400" : "text-discordMuted"}`}
                            size={35}
                        />
                    </button>
                    <button className="px-2 text-discordMuted hover:text-discordText">
                        <FiSmile className="" size={35} />
                    </button>
                    <button className="px-2 text-discordMuted hover:text-discordText">
                        <FiMic className="" size={35} />
                    </button>
                </div>
            </div>
        </div>
    );
}
