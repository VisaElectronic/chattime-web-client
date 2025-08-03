// src/components/ChatHeader.jsx
import { API_DOMAIN, DEFAULT_DATA } from "@/constants/api";
import { useClientMediaQuery } from "@/hook/useClientMediaQuery";
import { Avatar } from "flowbite-react";
import React from "react";
import BackButton from "../setting/back-button";
import { EMPTY_WINDOW } from "@/constants/window";

interface ChatHeaderProps {
    title: string;
    avatars: string[];
    goDetail: () => void;
}

export default function ChatHeader({ title = '', avatars = [], goDetail }: ChatHeaderProps) {
    const isDesktop = useClientMediaQuery('(min-width: 1024px)');
    return (
        <div className="flex items-center px-4 py-2 border-b-[0.01px] dark:border-b-[#656565] sticky top-0 w-full dark:bg-gray-800">
            {
                !isDesktop ?
                <div className="w-[10%]">
                    <BackButton typeWindow={EMPTY_WINDOW} />
                </div> :
                <></>
            }
            <div className={
                !isDesktop ? "flex items-center justify-center flex-grow pr-[10%]" :
                "flex items-center justify-start"
            } onClick={goDetail}>
                <div className="flex -space-x-2">
                    {avatars.slice(0, 4).map((url, idx) => (
                        <Avatar
                            key={idx}
                            img={API_DOMAIN + '/' + (url ? url : DEFAULT_DATA.PROFILE)}
                            rounded
                        />
                    ))}
                </div>
                {/* Chat title */}
                <h1 className="ml-3 text-discordText text-lg font-medium">{title}</h1>

                {/* (Optional) Right-side icons: search / more */}
                {/* <div className="ml-auto flex items-center space-x-3 text-discordMuted">
                    <FiSearch className="h-5 w-5 hover:text-discordText cursor-pointer" />
                    <FiMoreHorizontal className="h-5 w-5 hover:text-discordText cursor-pointer" />
                </div> */}
            </div>
            {/* {
                !isDesktop ?
                <div className="w-[10%]" onClick={goDetail}>
                </div> :
                <></>
            } */}
        </div>
    );
}
