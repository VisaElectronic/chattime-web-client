// pages/select-users.jsx
import { useState, useMemo } from 'react'
import { TextInput, Checkbox, Avatar, Button } from 'flowbite-react'
import { HiSearch } from 'react-icons/hi'
import { useWindowContentStore } from '@/stores/window-content'
import { CREATE_GROUP_CONFIRM } from '@/constants/window'

// mock data – replace with your real contacts
const CONTACTS = [
    { id: 1, name: 'Alice Nguyen', username: 'alice_ng', avatar: '/avatars/alice.jpg' },
    { id: 2, name: 'Bob Sok', username: 'bob_sok', avatar: '/avatars/bob.jpg' },
    { id: 3, name: 'Chantrea Chea', username: 'chantrea_c', avatar: '/avatars/chan.jpg' },
    // …etc
]

export default function ChooseUser() {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(new Set())
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);

    // filter contacts by search term
    const filtered = useMemo(() => {
        const q = query.toLowerCase()
        return CONTACTS.filter(u =>
            u.name.toLowerCase().includes(q) ||
            u.username.toLowerCase().includes(q)
        )
    }, [query])

    const toggle = (id: number) => {
        setSelected(prev => {
            const next = new Set(prev)
            if(next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white p-4">
            {/* header */}
            <header className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold">
                    Select Users {selected.size}/{CONTACTS.length}
                </h1>
                <Button
                    size="sm"
                    disabled={selected.size === 0}
                    onClick={() => {
                        setTypeWindow(CREATE_GROUP_CONFIRM)
                    }}
                >
                    Next
                </Button>
            </header>

            {/* search */}
            <TextInput
                className="mb-6"
                placeholder="Who would you like to add?"
                icon={HiSearch}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            {/* list */}
            <div>
                <h2 className="text-sm font-bold mb-2">FREQUENT CONTACTS</h2>
                <ul className="space-y-4">
                    {filtered.map(user => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between p-2 rounded hover:bg-gray-800"
                            onClick={() => toggle(user.id)}
                        >
                            <div className="flex items-center">
                                <Avatar
                                    img={user.avatar}
                                    rounded
                                    size="md"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-blue-400">@{user.username}</p>
                                </div>
                            </div>
                            <Checkbox
                                checked={selected.has(user.id)}
                                onChange={() => toggle(user.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
