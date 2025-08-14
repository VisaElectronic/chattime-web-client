import React, { useState, useEffect } from 'react';

// Define the props interface for the SimpleCountdown component
interface SimpleCountdownProps {
    initialSeconds: number; // The number of seconds to start counting down from
    setCanResend: (can: boolean) => void,
}

const SimpleCountdown: React.FC<SimpleCountdownProps> = ({ initialSeconds, setCanResend }) => {
    // State to hold the number of seconds remaining
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() => {
        // If secondsLeft is already 0 or less, no need for a timer
        if (secondsLeft <= 0) {
            setCanResend(true);
            return;
        }

        // Set up an interval to decrement the seconds every second
        const timer = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Clean up the interval when the component unmounts or secondsLeft reaches 0
        return () => clearInterval(timer);
    }, [initialSeconds, secondsLeft, setCanResend]); // Re-run effect when secondsLeft changes (to stop at 0)

    // Format the display for minutes and seconds
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div>
            <div className="flex items-center justify-center">
                {
                    minutes > 0 &&
                    <>
                        <div>
                            {minutes} minutes
                        </div>
                        <span className="">&nbsp;:&nbsp;</span>
                    </>
                }
                <div>
                    {seconds.toString().padStart(2, '0')} seconds
                </div>
            </div>
        </div>
    );
};

export default SimpleCountdown;
