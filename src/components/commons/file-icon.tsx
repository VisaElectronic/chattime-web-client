import { ReactNode } from "react";
import {
    FiFile,
    FiFileText,
    FiImage,
    FiMusic,
    FiVideo,
} from "react-icons/fi";

const extensionIconMap: Record<string, ReactNode> = {
    pdf: <FiFileText size={24} />,
    doc: <FiFileText size={24} />,
    docx: <FiFileText size={24} />,
    jpg: <FiImage size={24} />,
    jpeg: <FiImage size={24} />,
    png: <FiImage size={24} />,
    mp3: <FiMusic size={24} />,
    mp4: <FiVideo size={24} />,
};

interface FileIconProps {
    name: string;
    size: number;
}

export default function FileIcon({
    name,
    size
}: FileIconProps) {
    const ext = name.split(".").pop()?.toLowerCase() ?? "";
    return extensionIconMap[ext] ?? <FiFile size={size} />;
}