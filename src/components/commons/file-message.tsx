"use client";

import { API_DOMAIN } from "@/constants/api";
import FileBody from "@/dto/common/fiile.request";
import { UtilService } from "@/services/util.service";
import React from "react";
import FileIcon from "./file-icon";

interface FileListProps {
    file: FileBody;
}

export const FileMessage: React.FC<FileListProps> = ({ file }) => (
    <ul className="space-y-2">

        <li key={API_DOMAIN + '/' + file.uri}>
            <a
                href={API_DOMAIN + '/' + file.uri}
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

    </ul>
);
