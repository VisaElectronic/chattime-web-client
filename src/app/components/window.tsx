import ChatWindow from "./chat-ui/chat-window";

export default function WindowChat() {
    const currentUserId = "bob";

    return (
        <div className="w-full h-screen dark:bg-discordDark flex items-center justify-center">
            <ChatWindow currentUserId={currentUserId} />
        </div>
    );
};