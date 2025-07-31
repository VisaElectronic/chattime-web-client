// src/components/MessageItem.jsx
import { FileMessage } from "@/components/commons/file-message";
import VideoAutoHeight from "@/components/commons/video-auto-height";
import WaveFormPlayer from "@/components/commons/wave-form-player";
import { API_DOMAIN, DEFAULT_DATA } from "@/constants/api";
import { FILE_CHAT, IMAGE_CHAT, VOICE_CHAT } from "@/constants/type";
import MessageFileBody from "@/dto/common/message-file.request";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";

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

  const [, setAudioPlay] = useState(false);

  const files: MessageFileBody[] = JSON.parse(filesString) ?? [];

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
      <div className={`${bubbleStyle} rounded-2xl px-2 py-2`}>
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
          {
            type === VOICE_CHAT && files.map((file, idx) => {
              return <WaveFormPlayer 
                key={idx} url={API_DOMAIN + '/' + file.uri}
                setIsPlaying={setAudioPlay}
              />
            })
          }
          {
            type === FILE_CHAT && files.map((file, idx) => {
              return <FileMessage key={idx} file={file} />
            })
          }
        </div>
        <p className={"text-sm whitespace-pre-wrap " + ((content) ? 'mt-1' : '')}>{content}</p>
        <span className={"block text-[10px] text-gray-400 text-right " + (type !== VOICE_CHAT && (!content) ? 'mt-1' : '')}>
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