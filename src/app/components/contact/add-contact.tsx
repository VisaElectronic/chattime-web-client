import { FC, useState } from "react";
import { Modal, Button, Label, TextInput, ModalBody } from "flowbite-react";
import { FiXCircle } from "react-icons/fi";
import { ContactData } from "@/services/contact.service";

interface AddContactModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (data: ContactData) => void;
}

const AddContactModal: FC<AddContactModalProps> = ({
  show,
  onClose,
  onCreate,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    onCreate({ firstName, lastName, phoneNumber });
    // reset
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  return (
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
            <FiXCircle className="w-8 h-8 text-blue-400 hover:text-blue-300" />
        </button>
        <h3 className="text-xl font-semibold text-white text-center">
          Add Contact
        </h3>

        <form className="flex flex-col gap-4">
          {/* First Name */}
          <div>
            <Label htmlFor="firstName" className="sr-only">
              First Name
            </Label>
            <TextInput
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              required
              className="
                block w-full placeholder-gray-400 text-gray-200 bg-transparent
                rounded-none focus:ring-0 focus:border-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName" className="sr-only">
              Last Name
            </Label>
            <TextInput
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              required
              className="
                block w-full placeholder-gray-400 text-gray-200 bg-transparent
                rounded-none focus:ring-0 focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber" className="sr-only">
              Phone Number
            </Label>
            <TextInput
              id="phoneNumber"
              placeholder="Email Address"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              required
              className="block w-full placeholder-gray-400 text-gray-200 bg-transparent
                rounded-none focus:ring-0 focus:border-blue-500"
            />
          </div>

          {/* Create button */}
          <Button
            onClick={handleSubmit}
            className="w-full"
          >
            Create
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddContactModal;
