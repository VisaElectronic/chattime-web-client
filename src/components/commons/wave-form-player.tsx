import { useWavesurfer } from '@wavesurfer/react'
import { useCallback, useEffect, useRef } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
interface WaveFormPlayerProps {
    url: string;
    setIsPlaying: (isPlay: boolean) => void
}

const WaveFormPlayer = ({ url, setIsPlaying }: WaveFormPlayerProps) => {
    const containerRef = useRef(null)

    const { wavesurfer, isPlaying } = useWavesurfer({
        container: containerRef,
        height: 40,
        normalize: true,
        url,
    })

    const onPlayPause = useCallback(() => {
        if (!wavesurfer) return;
        wavesurfer.playPause()
    }, [wavesurfer])

    useEffect(() => {
        setIsPlaying(isPlaying);
    }, [isPlaying, setIsPlaying]);

    return (
        <div className='flex gap-2'>
            <div className='flex justify-center items-center'>
                <button onClick={onPlayPause} >
                    {isPlaying ? <FaPause /> : <FaPlay /> }
                </button>
            </div>
            <div className='flex-1 min-w-[100px]'>
                <div ref={containerRef} />
            </div>
        </div>
    )
}

export default WaveFormPlayer;
