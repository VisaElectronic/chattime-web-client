import { FC, useEffect, useMemo, useState } from "react";
import { Modal, Label, TextInput, ModalBody, List, ListItem, Avatar } from "flowbite-react";
import { FiXCircle } from "react-icons/fi";
import UpdateGroupDto from "@/dto/group/update-group.request";
import { GroupService } from "@/services/group.service";
import { useGroupChannelStore } from "@/stores/group-channel";
import { NOT_GROUP_MEMBERS } from "@/constants/type";
import Channel from "@/models/Channel";
import { API_DOMAIN, DEFAULT_DATA } from "@/constants/api";
import ConfirmAddMember from "./confirm-member";

interface AddMemberModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (data: UpdateGroupDto) => void;
}

const AddMemberModal: FC<AddMemberModalProps> = ({
  show,
  onClose,
  onCreate,
}) => {
  const selectedGroupChannel = useGroupChannelStore((state) => state.selectedGroupChannel)!;
  const [channels, setChannels] = useState<Channel[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    GroupService.getInfo(selectedGroupChannel.key, {
      type: NOT_GROUP_MEMBERS
    })
      .then(data => setChannels(data))
      .catch(err => console.error(err))
  }, [search, selectedGroupChannel.key])

  const handleConfirm = () => {
    setShowConfirm(false);
    setSearch("");
    if(selectedChannel) {
      onCreate({
        channelKeys: [
          selectedChannel.key
        ]
      });
    }
  };

  const filteredContacts = useMemo(() => {
    const q = search.toLowerCase()
    return channels.filter(channel =>
      channel.user.username.toLowerCase().includes(q) ||
      channel.user.firstname.toLowerCase().includes(q) ||
      channel.user.lastname.toLowerCase().includes(q)
    )
  }, [channels, search])

  return (
    <>
      <Modal
        show={show}
        size="md"
        dismissible
        popup
        onClose={onClose}
      >
        {/* body with your dark card */}
        <ModalBody className="dark:bg-gray-800 rounded-lg flex flex-col gap-4 p-4">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 left-4 focus:outline-none"
          >
            <FiXCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 hover:text-blue-300" />
          </button>
          <h3 className="text-xl font-semibold dark:text-white text-center">
            Add Members
          </h3>

          <form className="flex flex-col gap-4">
            {/* First Name */}
            <div>
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <TextInput
                id="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                required
                className="
                  block w-full placeholder-gray-400 text-gray-200 bg-transparent
                  rounded-none focus:ring-0 focus:border-blue-500"
              />
            </div>
            <List className='p-0 divide-y divide-gray-200 dark:divide-gray-700'>
              {filteredContacts.map((channel) => (
                <ListItem 
                  key={channel.key}
                  className="flex items-center justify-between py-1 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedChannel(channel);
                    setShowConfirm(true);
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar img={API_DOMAIN + '/' + (channel.user.avatar ? channel.user.avatar : DEFAULT_DATA.PROFILE)} rounded />
                    <div>
                      <h6 className="text-black dark:text-white text-sm">{channel.user.firstname + ' ' + channel.user.lastname}</h6>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </form>
        </ModalBody>
      </Modal>
      <ConfirmAddMember
        show={showConfirm}
        channel={selectedChannel!}
        onClose={() => setShowConfirm(false)}
        onCreate={handleConfirm}
      />
    </>
  );
};

export default AddMemberModal;
