import { PROFILE_DETAIL } from "@/constants/window";
import { useWindowContentStore } from "@/stores/window-content";
import { FiChevronRight } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";

// type SettingRowProps = {
//     onClick: () => void;
// }

export default function SettingRow() {
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    return (<>
        <div
            className="flex items-center justify-between my-5 dark:text-white cursor-pointer" 
            onClick={() => setTypeWindow(PROFILE_DETAIL)}
        >
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