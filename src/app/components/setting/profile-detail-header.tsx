// src/components/ChatHeader.jsx
import React from "react";

interface ProfileDetailHeaderProps {
    handlePressDone: () => void
}

export default function ProfileDetailHeader({ handlePressDone }: ProfileDetailHeaderProps) {
    return (
        <div className="flex justify-end items-center px-4 py-2 border-b-[0.01px] dark:border-b-[#656565] sticky top-0 w-full dark:bg-gray-800">
            <button className="text-blue-600 font-medium text-left cursor-pointer" onClick={handlePressDone}>
              Done
            </button>
        </div>
    );
}
