// pages/select-users.jsx
import { useState, useMemo, useEffect } from 'react'
import { TextInput, Checkbox, Avatar, Button } from 'flowbite-react'
import { HiSearch } from 'react-icons/hi'
import { useWindowContentStore } from '@/stores/window-content'
import { CREATE_GROUP_CONFIRM, EMPTY_WINDOW } from '@/constants/window'
import { ContactService } from '@/services/contact.service'
import Channel from '@/models/Channel'
import { API_DOMAIN } from '@/constants/api'
import { useSearchContactStore } from '@/stores/search-contact'
import BackButton from '@/app/components/setting/back-button'

export default function ChooseUser() {
    const [query, setQuery] = useState('')
    const [contacts, setContacts] = useState<Channel[]>([])
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const selectedContact = useSearchContactStore(state => state.selectedContact);
    const selected_contacts = useSearchContactStore(state => state.selected_contacts);
    const unselectedContact = useSearchContactStore(state => state.unselectedContact);

    useEffect(() => {
        ContactService.searchChannel({
            search: query
        })
        .then(data => setContacts(data))
        .catch(err => console.error(err))
    }, [query])

    // filter contacts by search term
    const filtered = useMemo(() => {
        const q = query.toLowerCase()
        return contacts.filter(channel =>
            channel.user.username.toLowerCase().includes(q) ||
            channel.user.firstname.toLowerCase().includes(q) ||
            channel.user.lastname.toLowerCase().includes(q)
        )
    }, [contacts, query])

    const toggle = (id: number) => {
        // 1️⃣ Find whether it’s already selected
        const isSelected = selected_contacts.some(c => c.id === id)
        // 2️⃣ Grab the channel once
        const channel = contacts.find(c => c.id === id) ?? null

        // 5️⃣ Now do the side-effects exactly once
        if (isSelected) {
            unselectedContact(channel)
        } else {
            selectedContact(channel)
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white p-4">
            {/* header */}
            <header className="flex items-center justify-between pb-3 border-b border-gray-700">
                <BackButton typeWindow={EMPTY_WINDOW} />
                <h1 className="text-lg font-medium">New Group</h1>
                <Button
                    size="sm"
                    disabled={selected_contacts.length === 0}
                    onClick={() => {
                        setTypeWindow(CREATE_GROUP_CONFIRM)
                    }}
                >
                    Next
                </Button>
            </header>

            {/* list */}
            <div className='py-4'>
                <div className='flex flex-col gap-3'>
                    <h1 className="text-lg font-semibold">
                        Select Users {selected_contacts.length}/{contacts.length}
                    </h1>

                    {/* search */}
                    <TextInput
                        className=""
                        placeholder="Who would you like to add?"
                        icon={HiSearch}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
                <h2 className="text-sm font-bold py-4">FREQUENT CONTACTS</h2>
                <ul className="space-y-4">
                    {filtered.map(channel => (
                        <li
                            key={channel.id}
                            className="flex items-center justify-between rounded hover:bg-gray-800"
                            onClick={() => toggle(channel.id)}
                        >
                            <div className="flex items-center">
                                <Avatar
                                    img={API_DOMAIN + '/' + channel.user.avatar}
                                    rounded
                                    size="md"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium">{channel.user.firstname + ' ' + channel.user.lastname}</p>
                                    <p className="text-xs text-blue-400">@{channel.user.username}</p>
                                </div>
                            </div>
                            <Checkbox
                                checked={selected_contacts.some(c => c.id === channel.id)}
                                onChange={() => toggle(channel.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
