import { Dropdown, DropdownItem } from 'flowbite-react'
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import {
    HiUserGroup,
} from 'react-icons/hi'
import AddContactModal from '../contact/add-contact';

export default function FabContactMenu() {
    const [showAdd, setShowAdd] = useState(false);

    const handleCreate = (data: unknown) => {
        console.log("New contact:", data);
        // ➞ call your API, update state, etc.
    };
    return (
        <div className="">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <FaUserPlus className="w-6 h-6 text-white" />
                }
            >
                <DropdownItem icon={HiUserGroup} onClick={() => setShowAdd(true)}>
                    New Contact
                </DropdownItem>
            </Dropdown>

            <AddContactModal
                show={showAdd}
                onClose={() => setShowAdd(false)}
                onCreate={handleCreate}
            />
        </div>
    )
}
