'use client'

import Sidebar from "@/app/components/sidebar";
import { CheckAuth } from "@/lib/check-auth";
import WindowChat from "./components/window";
import { useEffect, useState } from "react";
import { CHAT_WINDOW, EMPTY_WINDOW, PROFILE_DETAIL } from "@/constants/window";
import ProfileSettings from "./components/setting/profile-detail";

function Home() {
  const [typeWindow, setTypeWindow] = useState(EMPTY_WINDOW);
  const [windowContent, setWindowContent] = useState(<></>);

  useEffect(() => {
    if(typeWindow === EMPTY_WINDOW) {
      setWindowContent(<>Select a chat to start messsaging</>);
    } else if(typeWindow === CHAT_WINDOW) {
      setWindowContent(<WindowChat />);
    } else if(typeWindow === PROFILE_DETAIL) {
      setWindowContent(<ProfileSettings />);
    }
  }, [typeWindow])
  return (
    <div className="h-full">
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-full lg:w-85 h-screen transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full overflow-y-auto">
          <Sidebar onChangeTab={(type: number) => setTypeWindow(type)} />
        </div>
      </aside>

      <div className="h-full md:ml-85">
        {/* <Header /> */}
        <div className="h-full flex justify-center items-center dark:text-white">
          {windowContent}
        </div>
      </div>
    </div>
  );
}

export default CheckAuth(Home);
