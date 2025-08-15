import { API_DOMAIN, DEFAULT_DATA } from "@/constants/api";
import { FILE_CHAT, IMAGE_CHAT, VOICE_CHAT } from "@/constants/type";
import { CHAT_WINDOW } from "@/constants/window";
import { connectToChatChannel } from "@/lib/stomp";
import Channel from "@/models/Channel";
import GroupChannel from "@/models/GroupChannel";
import Message from "@/models/Message";
import { useGroupChannelStore } from "@/stores/group-channel";
import { useMessageStore } from "@/stores/message-store";
import { useWindowContentStore } from "@/stores/window-content";
import { Avatar, Badge } from "flowbite-react";

type SideBarChatProps = {
    groupChannel: GroupChannel;
}

export default function SideBarChat({ groupChannel }: SideBarChatProps) {
    const selectGroupChannel = useGroupChannelStore((state) => state.selectGroupChannel);
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const clearAll = useMessageStore((state) => state.clearAll);
    const channel: Channel = groupChannel.channel;
    const profile = groupChannel.group ? groupChannel.photo : channel?.user.avatar;
    const fullname = groupChannel.group ? groupChannel.name : channel?.user.firstname + ' ' + channel?.user.lastname;

    const clickOnChannel = () => {
        clearAll();
        setTypeWindow(CHAT_WINDOW);
        connectToChatChannel(groupChannel);
        selectGroupChannel(groupChannel);
    };

    const lastMessage = (message: Message) => {
        const sender = groupChannel.group && message.createdBy ?
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {message.createdBy.firstname + ' ' + message.createdBy.lastname}
            </p> :
            <></>;
        if (message.type === IMAGE_CHAT) {
            return <div className="flex flex-col">
                {
                    sender
                }
                <p>
                    Sent Photo
                </p>
            </div>
        } else if (message.type === FILE_CHAT) {
            return <div className="flex flex-col">
                {
                    sender
                }
                <p>
                    Sent File
                </p>
            </div>
        } else if (message.type === VOICE_CHAT) {
            return <div className="flex flex-col">
                {
                    sender
                }
                <p>
                    Sent Voice
                </p>
            </div>
        }
        return <div className="flex flex-col">
            {
                sender
            }
            <p>
                {message.content?.length > 50 ? message.content.substring(0, 50) + '...' : message.content}
            </p>
        </div>
    }

    return (
        <li onClick={clickOnChannel}>
            <div className="flex items-center p-3">
                <div className="shrink-0 z-[-1]">
                    <Avatar
                        img={API_DOMAIN + '/' + (profile ? profile : DEFAULT_DATA.PROFILE)}
                        rounded
                    />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {fullname}
                    </p>
                    <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {
                            groupChannel.lastMessage ?
                                lastMessage(groupChannel.lastMessage) : <>View Chats</>
                        }
                    </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {
                        groupChannel.unread ?
                            <Badge className="rounded-full" color="info">{groupChannel.unread}</Badge> : <></>
                    }
                </div>
            </div>
        </li>
    );
}