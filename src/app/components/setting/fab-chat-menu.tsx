// components/FabMenu.jsx
import { CREATE_GROUP_CHOOSE_USER } from '@/constants/window';
import { useWindowContentStore } from '@/stores/window-content'
import { Dropdown, DropdownItem } from 'flowbite-react'
import {
    HiPencilAlt,
    HiUserGroup,
} from 'react-icons/hi'

export default function FabChatMenu() {
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    return (
        <div className="">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <HiPencilAlt className="w-6 h-6 dark:text-white" />
                }
            >
                <DropdownItem icon={HiUserGroup} onClick={() => setTypeWindow(CREATE_GROUP_CHOOSE_USER)}>
                    New Group
                </DropdownItem>
            </Dropdown>
        </div>
    )
}
