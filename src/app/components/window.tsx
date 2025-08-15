import { useEffect, useState } from "react";
import ChatWindow from "./chat-ui/chat-window";
import { useWindowContentStore } from "@/stores/window-content";

export default function WindowChat() {
    const resetWindow = useWindowContentStore(state => state.resetWindow);
    const setResetWindow = useWindowContentStore(state => state.setResetWindow);
    const [isLoading, setIsLoading] = useState(false);
    const [scrollToBottom, setScrollToBottom] = useState(true);
    const [canScroll, setCanScroll] = useState(false);
    useEffect(() => {
        if(resetWindow) {
            setIsLoading(false);
            setScrollToBottom(true);
            setCanScroll(false);
            setResetWindow(false);
        }
    }, [resetWindow, setResetWindow])
    return (
        <div className="w-full h-screen dark:bg-discordDark flex items-center justify-center">
            <ChatWindow
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                scrollToBottom={scrollToBottom}
                setScrollToBottom={setScrollToBottom}
                canScroll={canScroll}
                setCanScroll={setCanScroll}
            />
        </div>
    );
};