'use client';

import { useEffect, useState } from 'react';

export function useClientMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Ensure window is defined (for client-side only)
        if (typeof window !== 'undefined') {
            const mediaQueryList = window.matchMedia(query);

            const handleMatchChange = (e: MediaQueryListEvent) => {
                setMatches(e.matches);
            };

            // Set initial state
            setMatches(mediaQueryList.matches);

            // Listen for changes
            mediaQueryList.addEventListener('change', handleMatchChange);

            // Clean up the event listener
            return () => {
                mediaQueryList.removeEventListener('change', handleMatchChange);
            };
        }
    }, [query]);

    return matches;
}