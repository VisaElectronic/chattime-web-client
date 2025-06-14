import ChatWindow from "./chat-ui/chat-window";

export default function WindowChat() {
    return (
        <div className="w-full h-screen dark:bg-discordDark flex items-center justify-center">
            <ChatWindow />
        </div>
    );
};