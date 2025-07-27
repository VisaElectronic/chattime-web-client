// src/components/MessageItem.jsx
import { API_DOMAIN, DEFAULT_DATA } from "@/constants/api";
import { Avatar } from "flowbite-react";
import React from "react";

interface MessageBubbleProps {
  content: string;
  isCurrentUser: boolean;
  createdAt: Date;
  avatar: string;
}

export default function MessageBubble({ content, isCurrentUser, createdAt, avatar }: MessageBubbleProps) {
  const alignment = isCurrentUser ? "justify-end" : "justify-start";
  const bubbleStyle = isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200";
  const date = (typeof createdAt === 'string' ? new Date(createdAt) : createdAt);

  return (
    <div className={`flex ${alignment} gap-1`}>
      {
        !isCurrentUser && avatar &&
        <div className="flex flex-col justify-end">
          <div>
            <Avatar
              img={API_DOMAIN + '/' + (avatar ? avatar : DEFAULT_DATA.PROFILE)}
              rounded
            />
          </div>
        </div>
      }
      <div className={`${bubbleStyle} rounded-2xl px-4 py-2 max-w-xs`}>  
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <span className="block text-[10px] text-gray-400 text-right mt-1">
          {date.toLocaleTimeString('en-US', {
            hour:   'numeric',    // "1"–"12"
            minute: '2-digit',    // "00"–"59"
            hour12: true
          }).toLowerCase()}
        </span>
      </div>
      {
        isCurrentUser && avatar &&
        <div className="flex flex-col justify-end">
          <div>
            <Avatar
              img={API_DOMAIN + '/' + (avatar ? avatar : DEFAULT_DATA.PROFILE)}
              rounded
            />
          </div>
        </div>
      }
    </div>
  );
}