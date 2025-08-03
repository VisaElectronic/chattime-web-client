import { API_DOMAIN, DEFAULT_DATA } from '@/constants/api';
import { GroupService } from '@/services/group.service';
import { Avatar } from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';
import { useGroupChannelStore } from '@/stores/group-channel';
import { toast } from 'react-toastify';
import Loading from '@/components/commons/loading';
import { useWindowContentStore } from '@/stores/window-content';
import { CHAT_DETAIL } from '@/constants/window';
import Dropzone from '@/components/commons/dropzone';
import { HiCamera } from 'react-icons/hi';
import UpdateGroupDto from '@/dto/group/update-group.request';

export default function ChatDetailEditScreen() {
    const notify = (desc: string) => toast.success(desc);
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const selectedGroupChannel = useGroupChannelStore((state) => state.selectedGroupChannel)!;
    const updateSelectGroupChannel = useGroupChannelStore((state) => state.updateSelectGroupChannel)!;
    const updateGroupChannel = useGroupChannelStore((state) => state.updateGroupChannel)!;
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [groupName, setGroupName] = useState('');
    const chatName = groupName ? groupName : (selectedGroupChannel?.name ?? '');
    const chatPhoto = selectedGroupChannel?.group ? selectedGroupChannel.photo : selectedGroupChannel?.channel.user.avatar;

    useEffect(() => {
    }, [])

    const handleFiles = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles)
    }, []);

    const handleUpdateGroup = async () => {
        setLoading(true);
        try {
            if(!groupName && (files && files.length <= 0)) {
                notify('Group updated successfully.');
                return;
            }
            const data: UpdateGroupDto = {
                groupName,
                photo: files
            };
            const res = await GroupService.updateGroup(selectedGroupChannel.key, data);
            if (res.success) {
                notify('Group updated successfully.');
                setFiles([]);
                setGroupName('');
                updateGroupChannel(res.data);
                updateSelectGroupChannel(res.data);
                return;
            }
            console.error(res.data)
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error(String(err));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen dark:bg-gray-900 text-white w-full">
                {/* Header */}
                <header className="flex items-center p-3 justify-between border-b-[0.01px] dark:border-b-[#656565] sticky top-0 w-full dark:bg-gray-800">
                    <div
                        className='cursor-pointer'
                        onClick={() => setTypeWindow(CHAT_DETAIL)}
                    >
                        Back
                    </div>
                    <h1 className="text-xl font-semibold">Info</h1>
                    <div
                        className='cursor-pointer text-primary-500'
                        onClick={handleUpdateGroup}
                    >
                        Done
                    </div>
                </header>

                <div className='my-5'>
                    {/* Avatar & Title */}
                    <div className="flex flex-col items-center gap-5">
                        <div className="relative rounded-full flex items-center justify-center text-6xl">
                            <Dropzone
                                onFiles={handleFiles}
                                previewSize='xl'
                            >
                                {
                                    (!files || files.length <= 0) && !chatPhoto ? <HiCamera className="w-6 h-6 text-gray-400" /> :
                                        <>
                                            <Avatar
                                                size="xl"
                                                img={API_DOMAIN + '/' + (chatPhoto ? chatPhoto : DEFAULT_DATA.PROFILE)}
                                                rounded
                                                className='opacity-50'
                                            />
                                            <HiCamera className="
                                                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                                w-10 h-10 text-gray-400
                                            "
                                            />
                                        </>
                                }
                            </Dropzone>
                        </div>
                        <input
                            id="groupName"
                            value={chatName}
                            onChange={e => setGroupName(e.target.value)}
                            type="text"
                            placeholder="test"
                            className="min-w-xs p-2.5 
                                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                outline-none
                                focus-visible::border-none
                            "
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
