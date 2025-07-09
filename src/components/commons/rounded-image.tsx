import Image from "next/image";

interface RoundedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
}

export default function RoundedImage({src, alt, width, height, className}: RoundedImageProps) {
    return (
        <div 
            className='overflow-hidden border border-gray-300 rounded-[50%] inline-block'
            style={{width: width + 'px', height: height + 'px' }}>
                <Image
                    src={src}
                    alt={alt}
                    width={width ?? 50}
                    height={height ?? 50}
                    className={className}
                />
        </div>
    );
}