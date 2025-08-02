import FileIcon from "@/components/commons/file-icon";
import { IMAGE_CHAT } from "@/constants/type";
import { UtilService } from "@/services/util.service";
import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import { FiSend, FiXCircle } from "react-icons/fi";

interface MessageConfirmFilesProps {
    type: number,
    show: boolean,
    uploadFiles: File[],
    onClose: () => void;
    onSend: (text: string, files: File[]) => void;
}

export default function MessageConfirmFiles({
    type,
    show,
    uploadFiles,
    onClose,
    onSend,
}: MessageConfirmFilesProps) {
    const [text, setText] = useState("");
    return (
        <Modal
            show={show}
            size="md"
            dismissible
            popup
            onClose={onClose}
        >
            <ModalBody className="bg-gray-800 rounded-lg flex flex-col gap-4 p-4">
                <div className="flex justify-between flex-[3_1_0%]">
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="focus:outline-none"
                    >
                        <FiXCircle className="w-8 h-8 text-blue-400 hover:text-blue-300" />
                    </button>
                    <h3 className="text-xl font-semibold text-white text-center">
                        {uploadFiles.length}
                        {type == IMAGE_CHAT ?
                            ('media' + (uploadFiles.length > 1 ? 's' : '')) :
                            'file' + (uploadFiles.length > 1 ? 's' : '')
                        }
                    </h3>
                    <div></div>
                </div>
                <ul className="space-y-2">
                    {
                        uploadFiles.map((file, idx) => {
                            return (
                                <li
                                    key={idx}
                                >
                                    <a
                                        download={file.name}
                                        className="flex items-center p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        <span className="mr-3 text-gray-500 dark:text-gray-400">
                                            {file.name ? <FileIcon name={file.name} size={24} /> : ''}
                                        </span>
                                        <div className="flex-grow">
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                {file.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {file.size ? UtilService.formatBytes(file.size) : ''}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="flex">
                    <textarea
                        className="
                        flex-1 resize-none rounded-full bg-discordDark px-4
                        border border-transparent focus:outline-none  
                        scrollbar-none
                    "
                        rows={1}
                        placeholder="Type your message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className="px-2 text-blue-500"
                        disabled={text.trim().length === 0}
                        onClick={() => {
                            setText('');
                            onSend(text.trim(), uploadFiles)
                        }}
                    >
                        <FiSend
                            className={`${text.trim() ? "text-blue-400" : "text-discordMuted"}`}
                            size={35}
                        />
                    </button>
                </div>
            </ModalBody>
        </Modal>
    )
}