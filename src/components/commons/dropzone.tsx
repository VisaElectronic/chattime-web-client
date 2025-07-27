// components/Dropzone.tsx
'use client'

import { Avatar } from 'flowbite-react';
import React, { useCallback, useState, ReactElement, CSSProperties } from 'react'
import { useDropzone } from 'react-dropzone'

type FileWithPreview = File & { preview: string }

interface DropzoneProps {
    onFiles?: (files: File[]) => void;
    /** a single React element that will serve as the drop-area container */
    children: ReactElement;
    /** optional inline styles for the preview grid */
    previewContainerStyle?: CSSProperties;
    previewSize?: string ;
    previewClassName?: string;
}

export default function Dropzone({
    onFiles,
    children,
    previewContainerStyle,
    previewSize,
    previewClassName
}: DropzoneProps) {
    const [previews, setPreviews] = useState<FileWithPreview[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const withPreview = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        )
        setPreviews(withPreview)
        onFiles?.(acceptedFiles)
    }, [onFiles])

    const removeFile = () => {
        onFiles?.([])
        setPreviews([])
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    // clone the single child, injecting our dropzone props and inner markup
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {previews.length <= 0 && children}
            {previews.length > 0 && (
                <div 
                    className='overflow-hidden border border-gray-300 rounded-[50%] inline-block'
                    style={{...previewContainerStyle }}>
                    {previews.map((file, i) => (
                        <div 
                            className="h-full relative group"
                            key={i}>
                            <Avatar
                                size={previewSize ? previewSize : 'md'}
                                img={file.preview}
                                rounded
                                className={previewClassName ? previewClassName : ''}
                            />
                            <button
                                onClick={e => {
                                    e.stopPropagation()
                                    removeFile()
                                }}
                                className='
                                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                    bg-black/60 text-white border-none rounded-full w-1/2 h-1/2 cursor-pointer
                                    opacity-0 group-hover:opacity-100
                                    pointer-events-none group-hover:pointer-events-auto
                                    transition-opacity
                                '
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
