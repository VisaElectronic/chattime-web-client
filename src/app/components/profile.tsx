import Image from "next/image";

interface ProfileProp {
    title: string;
    phone: string;
    username: string;
}

export default function Profile({title, phone, username}: ProfileProp) {
    return (
        <li>
            <div className="flex items-center">
                <div className="shrink-0">
                    <Image 
                        className="rounded-full" 
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                        alt="Neil image" 
                        width={50}
                        height={50}
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