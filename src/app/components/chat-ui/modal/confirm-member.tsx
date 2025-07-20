import { FC } from "react";
import { Button, Modal, ModalBody } from "flowbite-react";
import { FiXCircle } from "react-icons/fi";
import Channel from "@/models/Channel";

interface ConfirmAddMemberProps {
  show: boolean;
  channel: Channel;
  onClose: () => void;
  onCreate: () => void;
}

const ConfirmAddMember: FC<ConfirmAddMemberProps> = ({
  show,
  channel,
  onClose,
  onCreate,
}) => {
  const userName = channel ? channel.user.firstname + ' ' + channel.user.lastname : '';
  return (
    <Modal
      show={show}
      size="md"
      dismissible
      popup
      onClose={onClose}
    >
      {/* body with your dark card */}
      <ModalBody className="bg-gray-800 rounded-lg flex flex-col gap-4 p-4">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 left-4 focus:outline-none"
        >
          <FiXCircle className="w-8 h-8 text-blue-400 hover:text-blue-300" />
        </button>
        <h3 className="text-xl font-semibold text-white text-center">
          Confirm
        </h3>
        <div className="flex justify-center">
          <p>Add {userName} to the group ?</p>
        </div>

        <div className="flex justify-evenly">
          <Button className="cursor-pointer" color="light" onClick={onClose}>Cancel</Button>
          <Button className="cursor-pointer" onClick={onCreate}>Add</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmAddMember;
