import { Dropdown, DropdownItem } from 'flowbite-react'
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import {
    HiUserGroup,
} from 'react-icons/hi'
import AddContactModal from '../contact/add-contact';
import { ContactData, ContactService } from '@/services/contact.service';
import { useGroupChannelStore } from '@/stores/group-channel';

export default function FabContactMenu() {
    const addContact = useGroupChannelStore((state) => state.addItem);
    const [showAdd, setShowAdd] = useState(false);

    const handleCreate = async (data: ContactData) => {
        try {
            const res = await ContactService.addContact(data);
            console.log(res);
            if(res.success) {
                addContact(res.data)
                setShowAdd(false)
                return
            }
            console.error(res.data)
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error(String(err));
            }
        }
    };
    return (
        <div className="">
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <FaUserPlus className="w-6 h-6 dark:text-white" />
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
