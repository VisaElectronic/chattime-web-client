import { API_DOMAIN } from "@/constants/api";
import { CHAT_WINDOW } from "@/constants/window";
import { connectToChatChannel } from "@/lib/stomp";
import Channel from "@/models/Channel";
import GroupChannel from "@/models/GroupChannel";
import { useGroupChannelStore } from "@/stores/group-channel";
import { useWindowContentStore } from "@/stores/window-content";
import Image from "next/image";

type SideBarChatProps = {
    groupChannel: GroupChannel;
}

export default function SideBarChat({groupChannel}: SideBarChatProps) {
    const selectGroupChannel = useGroupChannelStore((state) => state.selectGroupChannel);
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const channel: Channel = groupChannel.channel;
    const profile = groupChannel.group ? groupChannel.photo : channel?.user.avatar;
    const fullname = groupChannel.group ? groupChannel.name : channel?.user.firstname + ' ' + channel?.user.lastname;

    const clickOnChannel = () => {
        setTypeWindow(CHAT_WINDOW);
        connectToChatChannel(groupChannel);
        selectGroupChannel(groupChannel);
    };

    return (
        <li onClick={clickOnChannel}>
            <div className="flex items-center p-3">
                <div className="shrink-0">
                    <Image 
                        className="rounded-full" 
                        src={API_DOMAIN + '/' + profile} 
                        alt="Neil image" 
                        width={35}
                        height={35}
                    />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {fullname}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Hi There!
                    </p>
                </div>
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    168
                </div> */}
            </div>
        </li>
    );
}