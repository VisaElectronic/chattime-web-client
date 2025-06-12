import React, { useState, useRef, useEffect } from "react";

// Sample messages
const initialMessages = [
  { id: 1, text: "Hi b", side: "left", time: "5:03 PM" },
  { id: 2, text: "I can't access school api now b", side: "left", time: "5:03 PM" },
  { id: 3, text: "postman you invite me before now i can't access b", side: "left", time: "5:06 PM" },
  { id: 4, text: "Bart b", side: "left", time: "5:08 PM" },
  { id: 5, text: "Okay b", side: "left", time: "5:08 PM" },
  { id: 6, text: "thank b", side: "left", time: "5:08 PM" },
  { id: 7, text: "I can access it now thank b", side: "left", time: "5:10 PM" },
  { id: 8, text: "could you give detail ? error message or postman ?", side: "right", time: "5:06 PM" },
  { id: 9, text: "but can access before right ?", side: "right", time: "5:07 PM" },
  { id: 10, text: "i see u still member", side: "right", time: "5:08 PM" },
  { id: 11, text: "let me invite again", side: "right", time: "5:08 PM" },
  { id: 12, text: "invited", side: "right", time: "5:09 PM" },
  // You can also add sticker messages by using `sticker: true` and `src` for the image URL
  { id: 13, sticker: true, src: "https://i.imgur.com/0Z8rFmB.png", side: "right", time: "5:11 PM" }
];

export default function MessageList() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const endRef = useRef(null);

  // Scroll to bottom only once on mount
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: inputValue,
      side: "right",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col bg-gray-900 p-4">
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map(msg => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}

function MessageBubble({ text, side, time, sticker, src }) {
  const alignment = side === "right" ? "justify-end" : "justify-start";
  const bubbleStyle = side === "right"
    ? "bg-blue-600 text-white"
    : "bg-gray-800 text-gray-200";

  return (
    <div className={`flex ${alignment}`}>  
      <div className={`${bubbleStyle} rounded-2xl px-4 py-2 max-w-xs`}>  
        {sticker ? (
          <img src={src} alt="sticker" className="max-w-full h-auto rounded" />
        ) : (
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        )}
        <span className="block text-[10px] text-gray-400 text-right mt-1">{time}</span>
      </div>
    </div>
  );
}
