// src/components/MessageItem.jsx
import { API_DOMAIN } from "@/constants/api";
import Image from "next/image";
import React from "react";

interface MessageBubbleProps {
  content: string;
  ofCurrentUser: boolean;
  createdAt: string;
  avatar: string;
}

export default function MessageBubble({ content, ofCurrentUser, createdAt, avatar }: MessageBubbleProps) {
  const alignment = ofCurrentUser ? "justify-end" : "justify-start";
  const bubbleStyle = ofCurrentUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200";

  return (
    <div className={`flex ${alignment} gap-1`}>
      {
        !ofCurrentUser && avatar &&
        <div className="flex flex-col justify-end">
          <div>
            <Image
            src={API_DOMAIN + '/' + avatar}
            width={35}
            height={35}
            alt="profile"
            className="rounded-full object-cover"
            />
          </div>
        </div>
      }
      <div className={`${bubbleStyle} rounded-2xl px-4 py-2 max-w-xs`}>  
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <span className="block text-[10px] text-gray-400 text-right mt-1">{new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      {
        ofCurrentUser && avatar &&
        <div className="flex flex-col justify-end">
          <div>
            <Image
            src={API_DOMAIN + '/' + avatar}
            width={35}
            height={35}
            alt="profile"
            className="rounded-full object-cover"
            />
          </div>
        </div>
      }
    </div>
  );
}