"use client";

import React, { useState } from "react";
import { HiUserCircle, HiOutlineCog, HiChatAlt2 } from "react-icons/hi";
import SideBarChat from "./chat";

const tabs = [
  {
    title: "Contacts",
    icon: HiUserCircle,
  },
  {
    title: "Chats",
    icon: HiChatAlt2,
  },
  {
    title: "Setting",
    icon: HiOutlineCog,
  },
];

type Sidebar = {
  contact: React.ReactNode;
  chat: React.ReactNode;
  setting: React.ReactNode;
};

export default function Sidebar() {
  const [active, setActive] = useState<number>(1);

  const getListOfContent = (title: string) => {
    const items: React.JSX.Element[] = [];
    for (let i = 0; i < 20; i++) {
      items.push(<SideBarChat key={i} title={title} />);
    }
    return items;
  }

  // compute your content based on `active`
  const content = (() => {
    switch (active) {
      case 1: return <>{getListOfContent('chat')}</>;
      case 2: return <>{getListOfContent('setting')}</>;
      default: return <>{getListOfContent('contact')}</>;
    }
  })();

  return (
    <div className="h-full">
      {/* 1) Content on top */}
      <div className="text-white">
        <ul className="space-y-2 font-medium">
          {content}
        </ul>
      </div>

      {/* 2) Buttons below */}
      <div className="bottom-0 fixed w-full py-3 bg-white dark:bg-gray-800 border-t-[0.01px] dark:border-t-[#656565]">
        <div className="flex justify-around">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = idx === active;
            return (
              <div key={idx} onClick={() => setActive(idx)}>
                <Icon className={isActive ? "text-white" : "text-gray-600"} size={35} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}