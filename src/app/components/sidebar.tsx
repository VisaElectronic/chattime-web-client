"use client";

import React, { useState } from "react";
import { HiUserCircle, HiOutlineCog, HiChatAlt2 } from "react-icons/hi";
import { FiChevronRight } from 'react-icons/fi';
import SideBarChat from "./chat";
import SearchBar from "./search";
import Profile from "./profile";
import { useGroupChannelStore } from "@/stores/group-channel";

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
  const groupChannels = useGroupChannelStore((state) => state.items);

  const getListOfChats = () => {
    const items: React.JSX.Element[] = [];
    for (let i = 0; i < groupChannels.length; i++) {
      items.push(<SideBarChat key={i} title={'Title'} />);
    }
    return items;
  }

  const getListOfSettings = () => {
    const items: React.JSX.Element[] = [];
    for (let i = 0; i < 1; i++) {
    }
    items.push(
      <div key={0} className="flex justify-between items-center cursor-pointer">
        <Profile title="John Does" phone="+855 098765432" username="@testuser" />
        <FiChevronRight className="text-white" size={20} />
      </div>
    )
    items.push(
      <div key={1} className="flex items-center justify-between my-5 dark:text-white cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="bg-red-700 rounded-sm">
            <HiUserCircle className="text-white" size={20} />
          </div>
          <p>My Profile</p>
        </div>
        <FiChevronRight className="text-white" size={20} />
      </div>
    )
    return items;
  }

  // compute your content based on `active`
  const content = (() => {
    switch (active) {
      case 1: return <>{getListOfChats()}</>;
      case 2: return <>{getListOfSettings()}</>;
      default: return <>{getListOfChats()}</>;
    }
  })();

  return (
    <div className="h-full">
      <SearchBar />
      <div className={active == 2 ? "dark:text-white p-3 lg:p-6" : "dark:text-white"}>
        <ul className="space-y-2 font-medium">
          {content}
        </ul>
      </div>
      <div className="w-full lg:w-85 bottom-0 fixed py-3 bg-white dark:bg-gray-800 border-t-[0.01px] dark:border-t-[#656565]">
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