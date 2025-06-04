// src/components/MessageItem.jsx
import Image from "next/image";
import React from "react";

export default function MessageItem({ message, currentUserId }) {
    const isOwn = message?.userId === currentUserId;
    const alignClass = isOwn ? "justify-end" : "justify-start";
    const bubbleBg = isOwn ? "bg-discordLight" : "bg-discordMedium";
    const textColor = isOwn ? "text-discordDark" : "text-discordText";

    return (
        <div className={`flex w-full px-4 my-1 ${alignClass}`}>
            {/* Avatar on opposite side: for own messages, show avatar on the right */}
            {!isOwn && (
                <Image
                    src={message.avatarUrl}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="h-8 w-8 rounded-full mr-2 object-cover"
                />
            )}

            <div className="flex flex-col max-w-[70%]">
                {/* Username + timestamp row */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-discordText">
                        {message.username}
                    </span>
                    <span className="text-xs text-discordMuted">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>

                {/* Message bubble */}
                <div
                    className={`
            mt-1 px-3 py-2 rounded-lg 
            ${bubbleBg} ${textColor} 
            ${isOwn ? "rounded-br-none" : "rounded-bl-none"}
          `}
                >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
            </div>

            {isOwn && (
                <Image
                    src={message.avatarUrl}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="h-8 w-8 rounded-full ml-2 object-cover"
                />
            )}
        </div>
    );
}
