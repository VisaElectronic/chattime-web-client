import React, { ReactElement, useRef, useState } from 'react';

interface GestureComponentProps {
    onHold: () => void,
    onLeave: () => void,
    onCancel: () => void,
    children: ReactElement;
}

function GestureComponent({
    onHold,
    onLeave,
    onCancel,
    children
}: GestureComponentProps) {
    // A ref to get a direct reference to the div DOM element
    const divRef = useRef<HTMLDivElement>(null);

    // State to track if the mouse is inside the div or has left the 50px boundary
    const [, setRecording] = useState<boolean | null>(null);

    // For mouse events
    const mouseStartX = useRef(null);
    const mouseEndX = useRef(null);

    const handleMouseDown = () => {
        setRecording(true);
        onHold();
    };

    // const handleMouseMove = (e) => {
    //     // Only track movement if a mouse down event has occurred
    //     // console.log('mouseStartX', e)
    //     if (!divRef.current) return;
    //     const rect = divRef.current.getBoundingClientRect();

    //     // Get the mouse coordinates from the event
    //     const mouseX = e.clientX;
    //     const mouseY = e.clientY;

    //     // Check if the mouse is outside the div's boundary plus the 50px padding
    //     const isOutsidePaddedArea =
    //         mouseX < rect.left - PADDING_THRESHOLD ||
    //         mouseX > rect.right + PADDING_THRESHOLD ||
    //         mouseY < rect.top - PADDING_THRESHOLD ||
    //         mouseY > rect.bottom + PADDING_THRESHOLD;

    //     // Check if the mouse is simply outside the div
    //     const isOutsideDiv =
    //         mouseX < rect.left ||
    //         mouseX > rect.right ||
    //         mouseY < rect.top ||
    //         mouseY > rect.bottom;

    //     console.log('isOutsideDiv', isOutsideDiv)

    // };

    const cancelGesture = () => {
        setRecording(false);
        console.log('cancel')
        onCancel();
    }

    const handleMouseUp = () => {
        console.log('sent record');
        setRecording(false);
        onLeave();

        mouseStartX.current = null;
        mouseEndX.current = null;
    };

    return (
        <div
            className='relative'
            ref={divRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={cancelGesture}
        >
            {children}
        </div>
    );
}

export default GestureComponent;