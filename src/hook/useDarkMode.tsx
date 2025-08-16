import { useState, useEffect } from 'react';

/**
 * Custom React hook to detect and react to the user's system dark mode preference.
 *
 * It uses the 'prefers-color-scheme' media query to determine the initial state
 * and listens for changes to this preference.
 *
 * @returns {boolean} True if the system is in dark mode, false otherwise.
 */
const useDarkMode = (): boolean => {
    // Initialize state with the current system preference.
    // window.matchMedia is used to check the media query.
    // It's checked within a function to ensure it runs only on the client-side
    // after the component has mounted (preventing issues during server-side rendering).
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        // Default to false if window is not defined (e.g., during SSR)
        return false;
    });

    useEffect(() => {
        // Check if window.matchMedia is available (client-side environment)
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        // Create a MediaQueryList object for the 'prefers-color-scheme: dark' query.
        const mediaQuery: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        // Define the event listener function.
        // This function will update the isDarkMode state whenever the media query matches change.
        const handleChange = (event: MediaQueryListEvent) => {
            setIsDarkMode(event.matches);
        };

        // Add the event listener to the MediaQueryList.
        // This will listen for changes in the system's dark/light mode preference.
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup function: Remove the event listener when the component unmounts
        // to prevent memory leaks.
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount.

    // Return the current dark mode status.
    return isDarkMode;
};

export default useDarkMode;
