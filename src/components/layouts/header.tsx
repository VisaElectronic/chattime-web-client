import Image from "next/image";

export default function Header() {
    return (
        <div className="hidden lg:block fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                            <Image
                                src="https://flowbite.com/docs/images/logo.svg"
                                alt="FlowBite Logo"
                                width={32}
                                height={32}
                                className="h-8 me-3"
                            />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Tonsaeay Chat</span>
                        </a>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}