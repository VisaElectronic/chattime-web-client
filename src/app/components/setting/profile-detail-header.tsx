// src/components/ChatHeader.jsx
import React from "react";
import BackButton from "./back-button";
import { EMPTY_WINDOW } from "@/constants/window";
import { useClientMediaQuery } from "@/hook/useClientMediaQuery";

interface ProfileDetailHeaderProps {
    handlePressDone: () => void
}

export default function ProfileDetailHeader({ handlePressDone }: ProfileDetailHeaderProps) {
    const isDesktop = useClientMediaQuery('(min-width: 1024px)');
    const justify = isDesktop ? 'justify-end' : 'justify-between';
    return (
        <div className={
            "flex items-center px-4 py-2 border-b-[0.01px] dark:border-b-[#656565] sticky top-0 w-full dark:bg-gray-800 "
            + justify
        }>
            {
                !isDesktop ?
                    <div className="">
                        <BackButton typeWindow={EMPTY_WINDOW} />
                    </div> :
                    <></>
            }
            <button className="text-blue-600 font-medium text-left cursor-pointer" onClick={handlePressDone}>
                Done
            </button>
        </div>
    );
}
