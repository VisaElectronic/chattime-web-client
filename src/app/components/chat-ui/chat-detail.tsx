import CardCustom from '@/components/commons/card-custom';
import { API_DOMAIN, DEFAULT_DATA } from '@/constants/api';
import { GroupService } from '@/services/group.service';
import { Avatar, Tabs, List, Badge, TabItem, ListItem } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import AddMemberModal from './modal/add-member';
import UpdateGroupDto from '@/dto/group/update-group.request';
import { useGroupChannelStore } from '@/stores/group-channel';
import ChannelMember from '@/models/ChannelMember';
import { ADMIN_ROLE_TYPE } from '@/constants/type';
import { ContextMenu, ContextMenuItem } from '@/components/commons/context/context-menu';
import { toast } from 'react-toastify';
import Loading from '@/components/commons/loading';
import { useWindowContentStore } from '@/stores/window-content';
import { CHAT_DETAIL_EDIT, CHAT_WINDOW } from '@/constants/window';

export default function ChatDetailScreen() {
    const notify = (desc: string) => toast.success(desc);
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    const selectedGroupChannel = useGroupChannelStore((state) => state.selectedGroupChannel)!;
    const [showAddMember, setShowAddMember] = useState(false);
    const [loading, setLoading] = useState(false);
    const chatName = selectedGroupChannel?.name ?? '';
    const chatPhoto = selectedGroupChannel?.group ? selectedGroupChannel.photo : selectedGroupChannel?.channel.user.avatar;

    const [members, setMembers] = useState<ChannelMember[]>([]);

    useEffect(() => {
        GroupService.getInfo(selectedGroupChannel.key, {
            type: 'MEMBERS'
        })
            .then(data => setMembers(data))
            .catch(err => console.error(err))
    }, [selectedGroupChannel.key])

    const handleAddMember = async (data: UpdateGroupDto) => {
        setLoading(true);
        try {
            const res = await GroupService.updateGroup(selectedGroupChannel.key, data);
            if (res.success) {
                notify('Add new member successfully.');
                GroupService.getInfo(selectedGroupChannel.key, {
                    type: 'MEMBERS'
                })
                    .then(data => setMembers(data))
                    .catch(err => console.error(err))
                return
            }
            console.error(res.data)
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error(String(err));
            }
        } finally {
            setShowAddMember(false);
            setLoading(false);
        }
    };

    const handleRemoveMember = async (channelKey: string) => {
        setLoading(true);
        try {
            const res = await GroupService.removeGroupMember(selectedGroupChannel.key, {
                channelKey
            });
            if (res.success) {
                notify('Remove member successfully.');
                setMembers(prev => prev.filter(member => member.key !== channelKey));
                return
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

    const contextMenuItems: ContextMenuItem[] = [
        { label: 'Delete', labelColor: 'text-red-500', onClick: (key: string) => handleRemoveMember(key) },
    ];

    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-gray-900 text-white w-full">
                {/* Header */}
                <header className="flex items-center p-3 justify-between border-b-[0.01px] dark:border-b-[#656565] sticky top-0 w-full dark:bg-gray-800">
                    <div
                        className='cursor-pointer'
                        onClick={() => setTypeWindow(CHAT_WINDOW)}
                    >
                        Back
                    </div>
                    <h1 className="text-xl font-semibold">Info</h1>
                    {
                        selectedGroupChannel.group ?
                        <div
                            className='cursor-pointer'
                            onClick={() => setTypeWindow(CHAT_DETAIL_EDIT)}
                        >
                            Edit
                        </div> : <div></div>
                    }
                </header>

                <div className='my-5'>
                    {/* Avatar & Title */}
                    <div className="flex flex-col items-center">
                        <div className="rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-6xl">
                            <Avatar
                                size="xl"
                                img={API_DOMAIN + '/' + (chatPhoto ? chatPhoto : DEFAULT_DATA.PROFILE)}
                                rounded
                            />
                        </div>
                        <h2 className="mt-4 text-2xl font-bold">{chatName}</h2>
                        <p className="text-gray-400">{members.length} members</p>
                    </div>

                    <div className='m-5 max-w-md mx-auto flex justify-evenly'>
                        <CardCustom className='cursor-pointer' onAction={() => setShowAddMember(true)}>
                            <div className='flex flex-col items-center'>
                                <FaUserPlus className="w-6 h-6 text-primary-400" />
                            </div>
                        </CardCustom>

                        <CardCustom className='cursor-pointer'>
                            <div className='flex items-center'>
                                <HiDotsHorizontal />
                            </div>
                        </CardCustom>
                    </div>

                    {/* Members List */}
                    <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden">
                        <Tabs aria-label="Info tabs" className='gap-0 p-0'>
                            <TabItem active title="Members" className='p-0'>
                                <List className='p-0 divide-y divide-gray-200 dark:divide-gray-700'>
                                    {members.map((member) => (
                                        <ContextMenu
                                            className="flex flex-col"
                                            items={contextMenuItems}
                                            key={member.key}
                                            currentChildKey={member.key}
                                        >
                                            <ListItem className="flex items-center justify-between px-4 py-1 hover:bg-gray-700 cursor-pointer">
                                                <div className="flex items-center space-x-4">
                                                    <Avatar img={API_DOMAIN + '/' + 'uploads/default-user.png'} rounded />
                                                    <div>
                                                        <h6 className="text-white text-sm">{member.user ? member.user.firstname + ' ' + member.user.lastname : ''}</h6>
                                                    </div>
                                                </div>
                                                {member.role && member.role === ADMIN_ROLE_TYPE && <Badge color="info" size="sm">Admin</Badge>}
                                            </ListItem>
                                        </ContextMenu>
                                    ))}
                                </List>
                            </TabItem>
                        </Tabs>
                    </div>
                </div>

                <AddMemberModal
                    show={showAddMember}
                    onClose={() => setShowAddMember(false)}
                    onCreate={handleAddMember}
                />
            </div>
        </>
    );
}
