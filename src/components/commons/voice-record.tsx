'use client';
import { useState, useEffect, useRef } from 'react';
import { FiMic } from 'react-icons/fi';
import GestureComponent from './gesture';
import { UtilService } from '@/services/util.service';

interface VoiceRecorderProps {
    onSendVoiceFile: (files: File[]) => void;
    setMessageType: () => void
}

export default function VoiceRecorder({
    onSendVoiceFile,
    setMessageType
}: VoiceRecorderProps) {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [, setAudioURL] = useState('');
    const [, setFiles] = useState<File[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const requestMediaPermission = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('getUserMedia is not supported in your browser.');
                setHasPermission(false);
                return;
            }
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasPermission(true);
            return;
        } catch (err) {
            console.log('err', err);
            if (err instanceof DOMException) {
                if (err.name === 'NotAllowedError') {
                    setHasPermission(false);
                }
            } else {
                console.error(`An unknown error occurred: ${String(err)}`);
                setHasPermission(false);
            }
            return;
        }
    };

    const startRecord = async () => {
        if (!hasPermission) {
            alert('Permission denied. Please grant access to your microphone.');
            return;
        }
        chunksRef.current = [];
        setAudioURL('');

        setIsRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = UtilService.getSupportedMimeType();
        const recorder = new MediaRecorder(stream, { mimeType });

        const chunks: BlobPart[] = [];

        recorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        recorder.onstop = () => {
            const ext = recorder.mimeType.split('/')[1].split(';')[0]
            const file = new File(chunks, window.crypto.randomUUID() + '.' + ext, { type: recorder.mimeType });
            const url = URL.createObjectURL(file) + '.' + ext;
            console.log('url to send', url);
            setAudioURL(url);
            setIsRecording(false);

            setAudioURL(url);
            setFiles([file]);

            onSendVoiceFile([file]);
            reset();
        };

        recorder.start();
        setMediaRecorder(recorder);
    };

    const stopRecording = () => {
        setMessageType();
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
        }
    };

    const reset = () => {
        setIsRecording(false);
        setAudioURL('');
        chunksRef.current = [];
    };

    useEffect(() => {
        requestMediaPermission();
    }, []);

    return (
        <div className="space-y-4">
            <GestureComponent
                onHold={startRecord}
                onLeave={stopRecording}
                onCancel={reset}
            >
                {
                    !isRecording ? <FiMic className="" size={35} /> :
                        <>
                            <FiMic className="" size={35} />
                            <div className="p-4 rounded-full border-2 flex bg-primary-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <FiMic className="" size={35} />
                            </div>
                        </>
                }
            </GestureComponent>
        </div>
    );
}
