// src/components/MessageItem.jsx
import VideoAutoHeight from "@/components/commons/video-auto-height";
import { API_DOMAIN, DEFAULT_DATA } from "@/constants/api";
import { IMAGE_CHAT } from "@/constants/type";
import MessageFileBody from "@/dto/common/message-file.request";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import React from "react";

interface MessageFileBubbleProps {
  content: string;
  isCurrentUser: boolean;
  createdAt: Date;
  avatar: string;
  filesString: string;
  type: number;
}

export default function MessageFileBubble({
  content,
  isCurrentUser,
  createdAt,
  avatar,
  filesString,
  type
}: MessageFileBubbleProps) {
  const alignment = isCurrentUser ? "justify-end" : "justify-start";
  const bubbleStyle = isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200";
  const date = (typeof createdAt === 'string' ? new Date(createdAt) : createdAt);

  const files: MessageFileBody[] = JSON.parse(filesString) ?? [];
  console.log('files', files);

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
      <div className={`${bubbleStyle} rounded-2xl px-2 py-2 max-w-xs`}>
        <div className="flex flex-col gap-5">
          {
            type === IMAGE_CHAT && files.map((file, idx) => {
              if (file.type?.startsWith('video')) {
                return <VideoAutoHeight key={idx} src={API_DOMAIN + '/' + file.uri} width={200} />
              }
              return (<Image
                key={idx}
                src={API_DOMAIN + '/' + file.uri}
                alt="chat image"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '200px', height: 'auto' }} // optional
              />);
            })
          }
        </div>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <span className="block text-[10px] text-gray-400 text-right mt-1">
          {date.toLocaleTimeString('en-US', {
            hour: 'numeric',    // "1"–"12"
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