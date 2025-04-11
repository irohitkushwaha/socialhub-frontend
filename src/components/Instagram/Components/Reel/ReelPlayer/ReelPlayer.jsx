import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { selectIsAutoScrollEnabled } from "../../../../../redux/slices/autoScrollSlice";
import { useSelector } from "react-redux";

const ReelPlayer = ({ videoUrl, onNextVideo, onPrevVideo }) => {
  const [playing, setPlaying] = useState(false); // Start paused
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [startY, setStartY] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);

  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const isAutoScrollEnabled = useSelector(selectIsAutoScrollEnabled);

  // Handle video click to toggle play/pause
  const handlePlayPause = (e) => {
    e.stopPropagation();
    setHasUserInteracted(true);
    setPlaying(!playing);
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setHasUserInteracted(true);
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    // If swipe distance is greater than 50px, consider it a valid swipe
    if (Math.abs(diff) > 10) {
      if (diff > 0) {
        // Swiped up - go to next video
        if (onNextVideo) onNextVideo();
      } else {
        // Swiped down - go to previous video
        if (onPrevVideo) onPrevVideo();
      }
      setIsSwiped(true);
    }
  };

  // Handle wheel scroll for desktop
  const handleWheel = (e) => {
    setHasUserInteracted(true);

    // Prevent multiple scroll events from firing too quickly
    if (isScrolling) return;

    setIsScrolling(true);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // If scrolling down (positive deltaY), go to next video
    if (e.deltaY > 0) {
      if (onNextVideo) onNextVideo();
    }
    // If scrolling up (negative deltaY), go to previous video
    else if (e.deltaY < 0) {
      if (onPrevVideo) onPrevVideo();
    }

    // Set a timeout to allow scrolling again after 800ms
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  };

  // Handle player errors - with auto retry
  const handleError = (e) => {
    console.error("Error playing video:", videoUrl, e);

    // Try to reload the player a few times before showing error
    if (retryCount < 3) {
      setRetryCount((prevCount) => prevCount + 1);

      // Wait a moment and retry
      setTimeout(() => {
        if (playerRef.current) {
          setIsLoading(true);
          setHasError(false);

          // Force reload the player
          const player = playerRef.current.getInternalPlayer();
          if (player && player.load) {
            try {
              player.load();
            } catch (err) {
              console.log("Couldn't reload player", err);
            }
          }
        }
      }, 1000);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  // Handle player ready state
  const handleReady = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Handle video start
  const handleStart = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // // Reset states when video URL changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);

    // Keep initial load paused, but autoplay when scrolling between videos
    if (hasUserInteracted) {
      setPlaying(true); // Auto-play when scrolling between videos
    } else {
      setPlaying(false); // First load stays paused
    }
  }, [isSwiped]);

  // Use Intersection Observer to control play/pause based on visibility
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // After user has interacted, control playback based on visibility
        if (hasUserInteracted) {
          // Play when in view, pause when out of view
          setPlaying(entry.isIntersecting && entry.intersectionRatio > 0.5);
        }
      },
      { threshold: [0.5] }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isSwiped]);

  // Add document-level event listener to track first user interaction
  useEffect(() => {
    const markUserInteraction = () => {
      setHasUserInteracted(true);
    };

    // Document level events to detect any user interaction
    document.addEventListener("click", markUserInteraction, { once: true });
    document.addEventListener("touchstart", markUserInteraction, {
      once: true,
    });
    document.addEventListener("keydown", markUserInteraction, { once: true });
    document.addEventListener("scroll", markUserInteraction, { once: true });

    return () => {
      document.removeEventListener("click", markUserInteraction);
      document.removeEventListener("touchstart", markUserInteraction);
      document.removeEventListener("keydown", markUserInteraction);
      document.removeEventListener("scroll", markUserInteraction);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle retry button click
  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);

    // Force reload the player
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      if (player && player.load) {
        try {
          player.load();
        } catch (err) {
          console.log("Couldn't reload player", err);
        }
      }
    }
  };

  // Add this useEffect after your other useEffects
  useEffect(() => {
    const handleKeyDown = (e) => {
      setHasUserInteracted(true);

      // Prevent handling if already scrolling
      if (isScrolling) return;

      setIsScrolling(true);

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Down arrow key - go to next video
      if (e.key === "ArrowDown") {
        if (onNextVideo) onNextVideo();
      }
      // Up arrow key - go to previous video
      else if (e.key === "ArrowUp") {
        if (onPrevVideo) onPrevVideo();
      } else {
        // If not up/down arrow, don't block scrolling
        setIsScrolling(false);
        return;
      }

      // Set a timeout to allow scrolling again after 300ms
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isScrolling, onNextVideo, onPrevVideo]);

  const handleNextVideo = () => {
    if (onNextVideo) onNextVideo();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full md:w-auto h-full overflow-hidden flex items-center justify-center bg-black md:aspect-[9/16] md:rounded-[10px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={!hasError ? handlePlayPause : undefined}
      onWheel={handleWheel}
    >
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={playing}
        volume={0.8}
        muted={false}
        controls={false}
        loop={!isAutoScrollEnabled}
        onError={handleError}
        onReady={handleReady}
        onStart={handleStart}
        playsinline={true}
        onEnded={isAutoScrollEnabled ? handleNextVideo : undefined}
        config={{
          file: {
            attributes: {
              style: { objectFit: "cover", width: "100%", height: "100%" },
              playsInline: true,
              preload: "auto",
            },
            forceVideo: true,
          },
          youtube: {
            playerVars: {
              modestbranding: 1,
              playsinline: 1,
              controls: 0,
              iv_load_policy: 3,
              mute: 0, // Ensure YouTube is not muted
            },
          },
        }}
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      {/* Overlay for better touch control */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 pointer-events-auto">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error indicator with retry button */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 pointer-events-auto">
            <p className="text-white mb-4">Unable to load video</p>
            <button
              className="bg-white text-black px-4 py-2 rounded-md"
              onClick={handleRetry}
            >
              Retry
            </button>
          </div>
        )}

        {/* Play button overlay (explicitly clickable) */}
        {!playing && !isLoading && !hasError && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            onClick={handlePlayPause}
          >
            <div className="bg-black bg-opacity-20 rounded-full p-4">
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="white"
                opacity="0.9"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelPlayer;
