import Image from "next/image";

export default function SideBarChat({title}: {title: string}) {
    return (
        <li>
            <div className="flex items-center p-3">
                <div className="shrink-0">
                    <Image 
                        className="rounded-full" 
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                        alt="Neil image" 
                        width={35}
                        height={35}
                    />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {title}
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