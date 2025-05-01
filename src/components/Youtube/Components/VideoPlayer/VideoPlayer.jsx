import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { selectHasInteracted } from "../../../../redux/slices/userInteractionSlice";

const VideoPlayer = ({ url }) => {
  const globalHasInteracted = useSelector(selectHasInteracted);


  // Player state
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [actuallyPlaying, setActuallyPlaying] = useState(false);


  // const [hasUserInteracted, setHasUserInteracted] = useState(globalHasInteracted || false);

  // Refs
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeout = useRef(null);
  const volumeRef = useRef(null);
  const progressBarRef = useRef(null);
  const initialLoadRef = useRef(false);
  const initialAutoplayRef = useRef(false);

  // Debug information

  // useEffect(() => {
  //   if (globalHasInteracted) {
  //     console.log("user interacted", globalHasInteracted);
  //     setPlaying(true);
  //   }
  //   else{
  //     setPlaying(false);
  //   }
  // }, [globalHasInteracted, url]);


  useEffect(() => {

    if (globalHasInteracted && playerReady && !initialAutoplayRef.current) {
      setPlaying(true);
      initialAutoplayRef.current = true;
    } else if (!globalHasInteracted) {
      setPlaying(false); // <-- This ensures the play icon is always correct
    }
    // Reset the ref when the video URL changes (i.e., navigation)
    return () => {
      // Pause the video when unmounting
      setPlaying(false);
      // Optionally, seek to start if you want to reset
      if (playerRef.current) {
        try {
          playerRef.current.seekTo(0);
        } catch {}
      }
      // Your existing cleanup
      initialAutoplayRef.current = false;
     
    };
  }, [globalHasInteracted, url, playerReady]);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-hide controls after inactivity
  useEffect(() => {
    if (playing) {
      clearTimeout(controlsTimeout.current);
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(controlsTimeout.current);
  }, [playing, showControls]);

  // Handle player events
  // const handlePlay = () => {
  //   setPlaying(true);
  // };

  // const handlePause = () => {
  //   setPlaying(false);
  // };

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
    setMuted(parseFloat(e.target.value) === 0);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  // const handleSeekMouseDown = () => {
  //   setSeeking(true);
  // };

  // const handleSeekChange = (e) => {
  //   setPlayed(parseFloat(e.target.value));
  // };

  // const handleSeekMouseUp = (e) => {
  //   setSeeking(false);
  //   playerRef.current.seekTo(parseFloat(e.target.value));
  // };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  // const handleFullscreen = () => {
  //   if (!document.fullscreenElement) {
  //     playerContainerRef.current.requestFullscreen().catch(err => {
  //       console.error(`Error attempting to enable fullscreen: ${err.message}`);
  //     });
  //     setFullscreen(true);
  //   } else {
  //     document.exitFullscreen();
  //     setFullscreen(false);
  //   }
  // };

  const handleFullscreen = () => {
    if (isMobile) {
      // For mobile, handle orientation along with fullscreen
      if (!document.fullscreenElement) {
        // Enter fullscreen and landscape mode
        playerContainerRef.current
          .requestFullscreen()
          .then(() => {
            // After entering fullscreen, lock to landscape orientation
            if (screen.orientation && screen.orientation.lock) {
              screen.orientation.lock("landscape").catch((err) => {
                console.warn(`Orientation lock failed: ${err.message}`);
              });
            }
          })
          .catch((err) => {
            console.error(
              `Error attempting to enable fullscreen: ${err.message}`
            );
          });
        setFullscreen(true);
      } else {
        // Exit fullscreen and unlock orientation
        document.exitFullscreen();
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
        setFullscreen(false);
      }
    } else {
      // For desktop, just handle fullscreen as before
      if (!document.fullscreenElement) {
        playerContainerRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");

    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }

    return `${mm}:${ss}`;
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);

    // if (playing) {
    //   clearTimeout(controlsTimeout.current);
    //   controlsTimeout.current = setTimeout(() => {
    //     setShowControls(false);
    //   }, 3000);
    // }
  };

  // Handle error
  const handleError = (error) => {
    console.error("ReactPlayer error:", error);
    setHasError(true);
  };

  // // Handle player ready
  // const handleReady = () => {
  //   console.log("ReactPlayer is ready");
  //   setIsReady(true);
  //   setHasError(false);
  // };

  // Add this useEffect to handle wheel events properly
  useEffect(() => {
    // Function to handle wheel events
    const handleVolumeWheel = (e) => {
      // Only handle events when the mouse is over the volume control
      if (volumeRef.current && volumeRef.current.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();

        // Use a smaller step for finer control (0.05 = 5% per scroll)
        const step = 0.05;
        // Note: deltaY is positive when scrolling down, negative when scrolling up
        const direction = e.deltaY > 0 ? -1 : 1; // Invert so up = increase, down = decrease

        // Calculate new volume with the smaller step
        const newVolume = Math.max(0, Math.min(1, volume + direction * step));

        setVolume(newVolume);
        setMuted(newVolume === 0);

        return false;
      }
    };

    // Add event listener with passive: false to properly prevent default
    document.addEventListener("wheel", handleVolumeWheel, { passive: false });

    // Clean up
    return () => {
      document.removeEventListener("wheel", handleVolumeWheel);
    };
  }, [volume, setVolume, setMuted]);

  // Add this useEffect to handle mouse and touch events for progress bar dragging
  useEffect(() => {
    // Handler for mouse/touch move during dragging
    const handlePointerMove = (e) => {
      if (isDragging && progressBarRef.current) {
        // Get the correct client coordinates (works for both mouse and touch)
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;

        const bounds = progressBarRef.current.getBoundingClientRect();
        const offsetX = Math.min(
          Math.max(0, clientX - bounds.left),
          bounds.width
        );
        const newPlayed = offsetX / bounds.width;

        // Update played position (visual only during drag)
        setPlayed(newPlayed);
      }
    };

    // Handler for mouse/touch up to end dragging
    const handlePointerUp = () => {
      if (isDragging) {
        // Seek to the position when dragging ends
        playerRef.current.seekTo(played);
        setIsDragging(false);
      }
    };

    // Add event listeners when dragging starts
    if (isDragging) {
      // Mouse events
      document.addEventListener("mousemove", handlePointerMove);
      document.addEventListener("mouseup", handlePointerUp);

      // Touch events
      document.addEventListener("touchmove", handlePointerMove, {
        passive: false,
      });
      document.addEventListener("touchend", handlePointerUp);
    }

    // Clean up
    return () => {
      // Remove mouse events
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", handlePointerUp);

      // Remove touch events
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, played]);

  // Add this useEffect to handle autoplay
  // useEffect(() => {
  //   const handleUserInteraction = () => {
  //     setHasUserInteracted(true);
  //     setPlaying(true)
  //     // Once user interacts, we can unmute if we were initially muted
  //     if (playing && muted) {
  //       setMuted(false);
  //     }

  //     if (globalHasInteracted){
  //       handleUserInteraction
  //     }
  //     // Remove the listeners after first interaction

  //   };

  // }, [playing, muted]);

  const handlePlay = () => setActuallyPlaying(true);
  const handlePause = () => setActuallyPlaying(false);

  return (
    <div className="relative w-full ">
      <div
        className="relative w-full aspect-video rounded-lg bg-black overflow-hidden group border"
        ref={playerContainerRef}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
        onClick={(e) => {
          // Only handle play/pause on desktop
          if (!isMobile) {
            handlePlayPause();
          }
        }}
        onDoubleClick={handleFullscreen}
      >
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center p-4">
              <svg
                className="w-16 h-16 mx-auto text-red-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Video Error</h3>
              <p className="text-gray-300">
                Could not load the video. Please try again later.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Video Player */}
            <ReactPlayer
              key={url}
              ref={playerRef}
              url={url}
              width="100%"
              height="100%"
              playing={playing}
              volume={volume}
              muted={muted}
              onPlay={handlePlay}
              onPause={handlePause}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onBuffer={() => setIsBuffering(true)}
              onBufferEnd={() => setIsBuffering(false)}
              // onReady={() => {
              //   setIsBuffering(false);
              //   // Try to ensure it's playing on ready
              //   setPlaying(false);
              // }}
              onReady={() => {
                setPlayerReady(true);

                setIsBuffering(false);
                setHasError(false);

                if (!initialLoadRef.current) {
                  // First time loading - set to paused
                  setPlaying(false);
                  initialLoadRef.current = true;
                } else {
                  // This is after seeking - maintain play state or force play
                  setPlaying(true);
                }
              }}
              onError={(e) => {
                console.error("Video playback error:", e);
                setIsBuffering(false);
              }}
              progressInterval={500}
              playsinline={true}
              controls={false}
              config={{
                file: {
                  attributes: {
                    // autoPlay: true,
                    playsInline: true,
                  },
                  forceVideo: true,
                },
              }}
            />

            {/* Mobile fullscreen progress bar - displayed inside the player container */}
            {isMobile && fullscreen && (
              <div
                ref={progressBarRef}
                className="absolute bottom-[25px]  left-0 right-0 h-[8px] bg-[#F5F5F5] z-50 cursor-pointer group mx-[20px]"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) {
                    const bounds = e.currentTarget.getBoundingClientRect();
                    const offsetX = e.clientX - bounds.left;
                    const clickedValue = offsetX / bounds.width;
                    playerRef.current.seekTo(clickedValue);
                    setPlayed(clickedValue);
                  }
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setIsDragging(true);
                  const bounds = e.currentTarget.getBoundingClientRect();
                  const offsetX = e.touches[0].clientX - bounds.left;
                  const clickedValue = offsetX / bounds.width;
                  setPlayed(clickedValue);
                }}
              >
                {/* Red progress indicator */}
                <div
                  className="absolute top-0 left-0 h-full bg-red-600"
                  style={{ width: `${played * 100}%` }}
                ></div>

                {/* Circle indicator */}
                <div
                  className="absolute h-5 w-5 bg-red-600 rounded-full shadow-md"
                  style={{
                    left: `calc(${played * 100}%)`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              </div>
            )}

            {isMobile && fullscreen && (
              <div className=" absolute bottom-[55px] flex justify-between px-[20px] left-0 right-0 items-center h-fit z-50">
                {/* Time display - positioned below the progress bar */}
                <div className="text-white text-[15px]">
                  {formatTime(duration * played)} / {formatTime(duration)}
                </div>

                <div className="flex items-center gap-3">
                  {/* Fullscreen Button */}
                  <button
                    onClick={handleFullscreen}
                    // onClick={(e) => {
                    //   // e.stopPropagation(); // Add this to prevent event bubbling
                    //   console.log("Exit fullscreen button clicked"); // Add debug logging
                    //   handleFullscreen();
                    // }}
                    className="text-white transition hover:cursor-pointer"
                  >
                    {fullscreen ? (
                      <svg
                        className="w-9 h-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                      </svg>
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Loading Spinner - only show when buffering and paused or actively loading */}
            {isBuffering && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
              </div>
            )}

            {/* Mobile center play button - bigger click area */}
            {isMobile && (
              <div
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
                ${showControls || !actuallyPlaying ? "opacity-100" : "opacity-0"} 
                transition-opacity duration-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
              >
                {/* Only show the button when paused */}
                {!actuallyPlaying && (
                  <button className="w-17 h-17 rounded-full bg-black/50 flex items-center justify-center">
                    <svg
                      className="w-13 h-13 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Custom Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transition-opacity duration-300 ${
                showControls || !actuallyPlaying ? "opacity-100" : "opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Bar for Desktop Only */}
              {!isMobile && (
                <div
                  ref={progressBarRef}
                  className="relative w-full h-[5px] bg-[#F5F5F5] rounded-full cursor-pointer mb-3 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isDragging) {
                      const bounds = e.currentTarget.getBoundingClientRect();
                      const offsetX = e.clientX - bounds.left;
                      const clickedValue = offsetX / bounds.width;
                      playerRef.current.seekTo(clickedValue);
                      setPlayed(clickedValue);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsDragging(true);
                    const bounds = e.currentTarget.getBoundingClientRect();
                    const offsetX = e.clientX - bounds.left;
                    const clickedValue = offsetX / bounds.width;
                    setPlayed(clickedValue);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setIsDragging(true);
                    const bounds = e.currentTarget.getBoundingClientRect();
                    const offsetX = e.touches[0].clientX - bounds.left;
                    const clickedValue = offsetX / bounds.width;
                    setPlayed(clickedValue);
                  }}
                >
                  {/* Red progress indicator */}
                  <div
                    className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                    style={{ width: `${played * 100}%` }}
                  ></div>

                  {/* Circle indicator */}
                  <div
                    className="absolute h-3 w-3 bg-red-600 rounded-full shadow-md group-hover:opacity-100 transition-opacity opacity-0"
                    style={{
                      left: `calc(${played * 100}%)`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: showControls || isDragging ? 1 : 0,
                    }}
                  ></div>
                </div>
              )}

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                {/* Left Controls - now includes volume */}
                <div className="flex items-center gap-5">
                  {/* Play/Pause Button */}
                  {!isMobile && (
                    <button
                      onClick={handlePlayPause}
                      className="text-white transition hover:cursor-pointer"
                    >
                      {actuallyPlaying ? (
                        <svg
                          className="w-9 h-9"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-9 h-9"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  )}

                  {/* Volume Control moved from right to left */}
                  {!isMobile && (
                    <div className="flex items-center gap-2" ref={volumeRef}>
                      <button
                        onClick={handleToggleMute}
                        className="text-white transition"
                      >
                        {muted || volume === 0 ? (
                          <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        ) : volume > 0.5 ? (
                          <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                          </svg>
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step="any"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                        style={{
                          background: `linear-gradient(to right, white 0%, white ${
                            volume * 100
                          }%, #4b5563 ${volume * 100}%, #4b5563 100%)`,
                        }}
                      />
                    </div>
                  )}

                  {/* Time Display */}

                  {isMobile && fullscreen ? (
                    ""
                  ) : (
                    <div className="text-white text-[15px]">
                      {formatTime(duration * played)} / {formatTime(duration)}
                    </div>
                  )}
                </div>

                {/* Right Controls - now only has fullscreen */}

                {isMobile && fullscreen ? (
                  ""
                ) : (
                  <div className="flex items-center gap-3">
                    {/* Fullscreen Button */}
                    <button
                      onClick={handleFullscreen}
                      className="text-white transition hover:cursor-pointer"
                    >
                      {fullscreen ? (
                        <svg
                          className="w-9 h-9"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-9 h-9"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Autoplay notification if muted */}
            {muted && playing && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                Click anywhere to unmute
              </div>
            )}
          </>
        )}
      </div>
      {/* Mobile-only Progress Bar - positioned at the very bottom */}
      {isMobile && (
        <div
          ref={progressBarRef}
          className="absolute bottom-0 left-0 right-0 h-[5px] bg-[#F5F5F5] z-40 cursor-pointer group mx-[3px]"
          onClick={(e) => {
            e.stopPropagation();
            if (!isDragging) {
              const bounds = e.currentTarget.getBoundingClientRect();
              const offsetX = e.clientX - bounds.left;
              const clickedValue = offsetX / bounds.width;
              playerRef.current.seekTo(clickedValue);
              setPlayed(clickedValue);
            }
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsDragging(true);
            const bounds = e.currentTarget.getBoundingClientRect();
            const offsetX = e.clientX - bounds.left;
            const clickedValue = offsetX / bounds.width;
            setPlayed(clickedValue);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setIsDragging(true);
            const bounds = e.currentTarget.getBoundingClientRect();
            const offsetX = e.touches[0].clientX - bounds.left;
            const clickedValue = offsetX / bounds.width;
            setPlayed(clickedValue);
          }}
        >
          {/* Red progress indicator */}
          <div
            className="absolute top-0 left-0 h-full bg-red-600"
            style={{ width: `${played * 100}%` }}
          ></div>

          {/* Circle indicator */}
          <div
            className="absolute h-3 w-3 bg-red-600 rounded-full shadow-md group-hover:opacity-100 transition-opacity opacity-0 "
            style={{
              left: `calc(${played * 100}%)`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: showControls || isDragging ? 1 : 0,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
