import { useState } from 'react'

interface VideoAutoHeightProps {
    src: string;
    width: number;
}

export default function VideoAutoHeight({ src, width }: VideoAutoHeightProps) {
  const [height, setHeight] = useState(0)

  return (
    <video
      src={src}
      controls
      width={width}
      height={height}
      style={{
        width: `${width}px`,
        height: 'auto',
        display: 'block',
      }}
      onLoadedMetadata={(e) => {
        const { videoWidth, videoHeight } = e.currentTarget
        setHeight((width / videoWidth) * videoHeight)
      }}
    />
  )
}
