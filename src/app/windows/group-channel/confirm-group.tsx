// pages/new-group.jsx
import { useState } from 'react'
import { Avatar, TextInput, Button } from 'flowbite-react'
import {
  HiChevronLeft,
  HiCamera,
  HiUserAdd
} from 'react-icons/hi'

// mock of members you’ve already picked
const SELECTED = [
  { id: 1, name: 'Chantrea Chea', avatar: '/avatars/chantrea.jpg', status: 'last seen recently' },
  { id: 2, name: 'Bob Sok', avatar: '/avatars/bob.jpg', status: 'last seen recently' },
]

export default function ConfirmGroup() {
  const [groupName, setGroupName] = useState('')

  return (
    <div className='w-full px-5 bg-gray-900'>
      <div className="min-h-screen text-white">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <a><HiChevronLeft className="w-6 h-6 text-blue-400" /></a>
          <h1 className="text-lg font-medium">New Group</h1>
          <Button
            color="light"
            size="sm"
            disabled={!groupName || SELECTED.length === 0}
            onClick={() => {/* create group action */}}
          >
            Create
          </Button>
        </header>

        <main className="p-4 space-y-4">
          {/* Group name & avatar */}
          <div className="bg-gray-800 rounded-lg flex items-center p-4 space-x-4">
            <button
              className="border-2 border-gray-600 rounded-full p-3 hover:border-blue-400"
              onClick={() => {/* open file picker */}}
            >
              <HiCamera className="w-6 h-6 text-gray-400" />
            </button>
            <TextInput
              placeholder="Group Name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              className="bg-gray-800 border-0 focus:ring-0 text-white placeholder-gray-500 text-lg"
            />
          </div>

          {/* Members section */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <a className="flex items-center p-4 space-x-2 hover:bg-gray-700">
              <HiUserAdd className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-medium">Add Members</span>
            </a>

            {/* Selected members */}
            {SELECTED.map((u) => (
              <div
                key={u.id}
                className={`flex items-center p-4 space-x-4 border-t border-gray-700`}
              >
                <Avatar img={u.avatar} rounded size="md" />
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-400">{u.status}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
