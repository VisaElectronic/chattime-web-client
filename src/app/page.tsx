'use client'

import Sidebar from "@/app/components/sidebar";
import { CheckAuth } from "@/lib/check-auth";
import WindowChat from "./components/window";
import { useEffect, useState } from "react";
import { CHAT_DETAIL, CHAT_WINDOW, CREATE_GROUP_CHOOSE_USER, CREATE_GROUP_CONFIRM, EMPTY_WINDOW, PROFILE_DETAIL } from "@/constants/window";
import ProfileSettings from "./components/setting/profile-detail";
import { useWindowContentStore } from "@/stores/window-content";
import ChooseUser from "./windows/group-channel/choose-user";
import ConfirmGroup from "./windows/group-channel/confirm-group";
import ChatDetailScreen from "./components/chat-ui/chat-detail";
import { ToastContainer } from 'react-toastify';

function Home() {
  const typeWindow = useWindowContentStore(state => state.typeWindow);
  const [windowContent, setWindowContent] = useState(<></>);

  useEffect(() => {
    if(typeWindow === EMPTY_WINDOW) {
      setWindowContent(<>Select a chat to start messsaging</>);
    } else if(typeWindow === CHAT_WINDOW) {
      setWindowContent(<WindowChat />);
    } else if(typeWindow === CHAT_DETAIL) {
      setWindowContent(<ChatDetailScreen />);
    } else if(typeWindow === PROFILE_DETAIL) {
      setWindowContent(<ProfileSettings />);
    } else if(typeWindow === CREATE_GROUP_CHOOSE_USER) {
      setWindowContent(<ChooseUser />);
    } else if(typeWindow === CREATE_GROUP_CONFIRM) {
      setWindowContent(<ConfirmGroup />);
    }
  }, [typeWindow])
  return (
    <div className="h-full">
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-full lg:w-85 h-screen transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      <div className="h-full md:ml-85">
        {/* <Header /> */}
        <div className="h-full flex justify-center items-center dark:text-white">
          {windowContent}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CheckAuth(Home);
