import Message from "@/models/Message";
import React, { useRef, useEffect } from "react";
import MessageBubble from "./message-item";

interface MessageListProp {
  messages: Message[]
}

export default function MessageList({messages}: MessageListProp) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // whenever messages change, scroll the bottom sentinel into view
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col px-4">
      <div className="py-4 space-y-3 ">
        {messages.map(msg => (
          <MessageBubble key={msg.id} {...msg} avatar={msg.user.avatar} />
        ))}
      </div>
      {/* sentinel element to scroll into view */}
      <div ref={bottomRef} />
    </div>
  );
}