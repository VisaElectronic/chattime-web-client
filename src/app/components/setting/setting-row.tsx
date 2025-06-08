import { FiChevronRight } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";

type SettingRowProps = {
    onClick: () => void;
}

export default function SettingRow({onClick}: SettingRowProps) {
    return (<>
        <div className="flex items-center justify-between my-5 dark:text-white cursor-pointer" onClick={onClick}>
            <div className="flex items-center gap-3">
                <div className="bg-red-700 rounded-sm">
                <HiUserCircle className="text-white" size={20} />
                </div>
                <p>My Profile</p>
            </div>
            <FiChevronRight className="text-white" size={20} />
        </div>
    </>);
}