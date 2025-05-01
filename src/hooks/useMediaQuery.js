import { useState, useEffect } from "react";

export const useMediaQuery = (query) => {
  // Initialize with the current state of the media query
  const [matches, setMatches] = useState(() => {
    // Check if window is available (for SSR safety)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false; // Default for SSR
  });

  useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Add listener for changes
    const listener = () => setMatches(media.matches);
    
    // Modern API
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]); // Only re-run if query changes

  return matches;
};
