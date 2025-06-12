// src/components/ChatInput.jsx
import React, { useState } from "react";
import { FiPlus, FiSmile, FiSend, FiMic } from "react-icons/fi";

export default function ChatInput({ onSend }) {
    const [text, setText] = useState("");

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="px-4 py-3 border-y-[0.01px] dark:border-y-[#656565] sticky bottom-0 w-full dark:bg-gray-800">
            <div className="flex items-center space-x-2">
                {/* + button */}
                <button className="px-2 text-discordMuted hover:text-discordText">
                    <FiPlus className="h-5 w-5" />
                </button>

                {/* Text area with a thin blue ring on focus */}
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

                {/* Emoji, Send, Mic */}
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
