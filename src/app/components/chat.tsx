import { API_DOMAIN } from "@/constants/api";
import { connectToChat } from "@/lib/stomp";
import Channel from "@/models/Channel";
import GroupChannel from "@/models/GroupChannel";
import Image from "next/image";

type SideBarChatProps = {
    groupChannel: GroupChannel;
    onClickChannel: () => void;
}

export default function SideBarChat({groupChannel, onClickChannel}: SideBarChatProps) {
    const channel: Channel = groupChannel.channel;

    const clickOnChannel = () => {
        onClickChannel();
        connectToChat(groupChannel);
    };

    return (
        <li onClick={clickOnChannel}>
            <div className="flex items-center p-3">
                <div className="shrink-0">
                    <Image 
                        className="rounded-full" 
                        src={API_DOMAIN + '/' + channel.user.avatar} 
                        alt="Neil image" 
                        width={35}
                        height={35}
                    />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {channel.user.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Hi There!
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    168
                </div>
            </div>
        </li>
    );
}