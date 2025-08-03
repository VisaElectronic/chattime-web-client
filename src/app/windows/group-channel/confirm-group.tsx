// pages/new-group.jsx
import { HTMLAttributes, useCallback, useState } from 'react'
import { Avatar, TextInput, Button } from 'flowbite-react'
import {
  HiCamera,
} from 'react-icons/hi'
import { useSearchContactStore } from '@/stores/search-contact'
import { API_DOMAIN, DEFAULT_DATA } from '@/constants/api'
import BackButton from '@/app/components/setting/back-button'
import { CREATE_GROUP_CHOOSE_USER, EMPTY_WINDOW } from '@/constants/window'
import Dropzone from '@/components/commons/dropzone'
import { useGroupChannelStore } from '@/stores/group-channel'
import { useWindowContentStore } from '@/stores/window-content'
import { GroupService } from '@/services/group.service'
import Loading from '@/components/commons/loading'

const UploadGroupProfile: React.FC<HTMLAttributes<HTMLElement>> = props => {
  return (
    <button
      className="border-2 border-gray-600 rounded-full p-3 hover:border-blue-400"
      {...props}
    >
      <HiCamera className="w-6 h-6 text-gray-400" />
    </button>
  );
}

export default function ConfirmGroup() {
  const [loading, setLoading] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const selected_contacts = useSearchContactStore(state => state.selected_contacts);
  const addGroupChannel = useGroupChannelStore((state) => state.addItem);
  const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);

  // called by your Dropzone onFiles
  const handleFiles = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const createGroup = async () => {
    setLoading(true);
    try {
      const data = {
        groupName: groupName,
        photo: files,
        channelKeys: selected_contacts.map(c => c.key)
      };
      const res = await GroupService.createGroup(data)
      if(res.data) {
        addGroupChannel(res.data)
        setTypeWindow(EMPTY_WINDOW)
      }
    } catch (err) {
      console.error(err)
      if (typeof err === "string") {
          err.toUpperCase()
      } else if (err instanceof Error) {
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className='w-full px-5 bg-gray-900'>
        <div className="min-h-screen text-white">
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <BackButton typeWindow={CREATE_GROUP_CHOOSE_USER} />
            <h1 className="text-lg font-medium">New Group</h1>
            <Button
              size="sm"
              disabled={!groupName || selected_contacts.length === 0}
              onClick={createGroup}
            >
              Create
            </Button>
          </header>

          <main className="p-4 space-y-4">
            {/* Group name & avatar */}
            <div className="bg-gray-800 rounded-lg flex items-center p-4 space-x-4">
              <Dropzone 
                onFiles={handleFiles}
              >
                <UploadGroupProfile />
              </Dropzone>
              <TextInput
                placeholder="Group Name"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                className="bg-gray-800 border-0 focus:ring-0 text-white placeholder-gray-500 text-lg"
              />
            </div>

            {/* Members section */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {/* <a className="flex items-center p-4 space-x-2 hover:bg-gray-700">
                <HiUserAdd className="w-6 h-6 text-blue-400" />
                <span className="text-blue-400 font-medium">Add Members</span>
              </a> */}

              {/* Selected members */}
              {selected_contacts.map((channel) => (
                <div
                  key={channel.id}
                  className={`flex items-center p-4 space-x-4 border-t border-gray-700`}
                >
                  <Avatar img={API_DOMAIN + '/' + (channel.user.avatar ? channel.user.avatar : DEFAULT_DATA.PROFILE)} rounded size="md" />
                  <div>
                    <p className="font-medium">{channel.user.firstname + ' ' + channel.user.lastname}</p>
                    <p className="text-xs text-blue-400">@{channel.user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
