import { API_DOMAIN, DEFAULT_DATA } from "@/constants/api";
import { Avatar } from "flowbite-react";

interface ProfileProp {
    avatar: string;
    title: string;
    phone: string;
    username: string;
}

export default function Profile({avatar, title, phone, username}: ProfileProp) {
    return (
        <li>
            <div className="flex items-center">
                <div className="shrink-0">
                    <Avatar
                        size="md"
                        img={API_DOMAIN + '/' + (avatar ? avatar : DEFAULT_DATA.PROFILE)}
                        rounded
                    />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {title}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {phone}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        @{username}
                    </p>
                </div>
            </div>
        </li>
    );
}