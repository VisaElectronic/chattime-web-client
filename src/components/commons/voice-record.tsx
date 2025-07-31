'use client';
import { useState, useEffect, useRef } from 'react';

export default function VoiceRecorder() {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [audioURL, setAudioURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    // initialize MediaRecorder once on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(stream => {
                const mr = new MediaRecorder(stream);
                mr.ondataavailable = e => chunksRef.current.push(e.data);
                mr.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                    setAudioURL(URL.createObjectURL(blob));
                };
                setMediaRecorder(mr);
            })
            .catch(err => console.error('Mic access denied:', err));
        // cleanup on unmount
        return () => {
            mediaRecorder?.stream?.getTracks().forEach(t => t.stop());
        };
    }, [mediaRecorder?.stream]);

    const start = () => {
        chunksRef.current = [];
        setAudioURL('');
        mediaRecorder?.start();
        setIsRecording(true);
    };

    const stop = () => {
        mediaRecorder?.stop();
        setIsRecording(false);
    };

    const reset = () => {
        setAudioURL('');
        chunksRef.current = [];
    };

    return (
        <div className="space-y-4">
            {!isRecording
                ? <button onClick={start}>🎙️ Start Recording</button>
                : <button onClick={stop}>⏹️ Stop Recording</button>
            }

            {audioURL && (
                <div className="space-x-2">
                    <audio src={audioURL} controls />
                    <button onClick={reset}>🔄 Re-record</button>
                </div>
            )}
        </div>
    );
}
