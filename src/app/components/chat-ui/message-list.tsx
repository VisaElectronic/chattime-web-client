import Message from "@/models/Message";
import React, { useRef, useEffect } from "react";
import MessageBubble from "./message-item";
import { useUserStore } from "@/stores/profile";
import { TEXT_CHAT } from "@/constants/type";
import MessageFileBubble from "./message-file";

interface MessageListProp {
  messages: Message[]
  scrollToBottom: boolean
}

export default function MessageList({
  messages,
  scrollToBottom,
}: MessageListProp) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentUser = useUserStore(state => state.item);
  messages = [...messages].reverse();

  useEffect(() => {
    if(scrollToBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('scroll bottom');
  }, [messages, scrollToBottom]);

  return (
    <div
      className="h-full flex flex-col px-4"
    >
      <div className="py-4 space-y-3 mt-auto">
        {messages.map((msg, idx) => {
          const isCurrentUser: boolean = msg.user.id === currentUser?.id;
          if (msg.type !== TEXT_CHAT) {
            return <MessageFileBubble
              key={idx} {...msg} isCurrentUser={isCurrentUser} avatar={msg.user.avatar}
              filesString={msg.files ? msg.files : (msg.audio ?? '[]')}
              type={msg.type}
            />;
          } else if (msg.type === TEXT_CHAT) {
            return <MessageBubble key={idx} {...msg} isCurrentUser={isCurrentUser} avatar={msg.user.avatar} />;
          }
          return <></>;
        })}
      </div>
      {/* sentinel element to scroll into view */}
      <div ref={bottomRef} />
    </div>
  );
}