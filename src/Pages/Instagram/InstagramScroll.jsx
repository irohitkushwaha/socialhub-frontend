import React, { useState, useEffect, useRef } from "react";
import ReelPlayer from "../../components/Instagram/Components/Reel/ReelPlayer";
import ReelActions from "../../components/Instagram/Components/Reel/ReelAction";
import ReelOwnerFollow from "../../components/Instagram/Components/Reel/ReelOwnerFollow";
import ShareModal from "../../components/Common/ShareModal";
import { useSelector } from "react-redux";
import { selectIsShareModalOpen } from "../../redux/slices/shareSlice";
import { selectIsCommentOpen } from "../../redux/slices/commentSlice";
import CommentCompo from "../../components/Common/CommentCompo";
import { videoService } from "../../Services/api/Video.Service";

const InstagramScroll = () => {
  const [videoOptions, setVideoOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isCommentOpen = useSelector(selectIsCommentOpen);
  const isShareModalOpen = useSelector(selectIsShareModalOpen);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideo = videoOptions[currentVideoIndex] || {};
  const [isMobile, setIsMobile] = useState(false);

  // Add new state for slide transitions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);
  const [startY, setStartY] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Refs
  const slideContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  // Function to fetch videos
  const fetchVideos = async (page) => {
    if (!hasMore && page > 1) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await videoService.getShortsList(page, 2);

      console.log("response for shorts list", response);

      if (response) {
        const newVideos = response.VideosList.map((video) => ({
          id: video._id,
          url: video.VideoFile,
          owner: video.Owner,
          likes: video.VideoLikesCount,
          comments: video.CommentsCount,
          isLiked: video.IsLiked,
          isSaved: video.IsSaved,
          isFollowing: video.IsFollow,
        }));

        console.log("new videos", newVideos);

        // Add to existing videos
        setVideoOptions((prev) => [...prev, ...newVideos]);
        setCurrentPage(page);
        setHasMore(response.HasMore);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial videos
  useEffect(() => {
    // Only fetch initial videos if we haven't already
    if (videoOptions.length === 0 && hasMore) {
      fetchVideos(1);
    }
  }, []);

  console.log("videoOptions", videoOptions);

  console.log("currentVideo", currentVideo);

  // Load more videos when we're close to the end
  useEffect(() => {
    // If we have 3 or fewer videos left and there are more to load
    if (
      videoOptions.length > 0 && // Important: Must have at least 1 video from initial load
      videoOptions.length - currentVideoIndex <= 3 &&
      hasMore &&
      !isLoading &&
      currentPage > 0
    ) {
      fetchVideos(currentPage + 1);
    }
  }, [currentVideoIndex, videoOptions.length, hasMore, isLoading, currentPage]);

  // Prevent scrolling on the body when this component mounts
  useEffect(() => {
    // Save the original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on body
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Restore original styles when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleNextVideo = () => {
    if (isTransitioning) return;
    triggerSlideTransition("up");
  };

  const handlePrevVideo = () => {
    if (isTransitioning) return;
    triggerSlideTransition("down");
  };

  // Trigger the slide transition
  const triggerSlideTransition = (direction) => {
    if (isTransitioning) return; // Prevent multiple transitions

    setIsTransitioning(true);
    setSlideDirection(direction);

    // Apply the transition
    if (slideContainerRef.current) {
      slideContainerRef.current.style.transition = `transform ${
        isMobile ? "0.5s" : "0.4s"
      } ease-out`;

      if (direction === "up") {
        slideContainerRef.current.style.transform = "translateY(-100%)";
      } else {
        slideContainerRef.current.style.transform = "translateY(100%)";
      }
    }

    // After transition completes, change the video and reset
    transitionTimeoutRef.current = setTimeout(
      () => {
        if (direction === "up") {
          setCurrentVideoIndex((currentVideoIndex + 1) % videoOptions.length);
        } else {
          setCurrentVideoIndex(
            (currentVideoIndex - 1 + videoOptions.length) % videoOptions.length
          );
        }

        // Reset the transform immediately (no transition)
        if (slideContainerRef.current) {
          slideContainerRef.current.style.transition = "none";
          slideContainerRef.current.style.transform = "translateY(0)";
        }

        // Reset transition flags after a short delay
        setTimeout(() => {
          setIsTransitioning(false);
          setSlideDirection(null);
        }, 50);
      },
      isMobile ? 500 : 10
    ); // Match this with the transition duration
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    if (isTransitioning) return;
    setStartY(e.touches[0].clientY);
    setTouchDelta(0);
  };

  const handleTouchMove = (e) => {
    if (isTransitioning) return;
    const currentY = e.touches[0].clientY;
    const delta = startY - currentY;
    setTouchDelta(delta);

    // Move the reel container based on touch
    if (slideContainerRef.current) {
      const translateY = -delta * 0.5; // Dampen the movement
      slideContainerRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (isTransitioning) return;

    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    // Reset the touch move transform
    if (slideContainerRef.current) {
      slideContainerRef.current.style.transition = "transform 0.3s ease-out";
      slideContainerRef.current.style.transform = "translateY(0)";

      // Remove the transition after it completes
      setTimeout(() => {
        if (slideContainerRef.current) {
          slideContainerRef.current.style.transition = "";
        }
      }, 300);
    }

    // If swipe distance is greater than threshold, consider it a valid swipe
    if (Math.abs(diff) > 80) {
      // Increased threshold for better UX
      if (diff > 0) {
        // Swiped up - go to next video
        triggerSlideTransition("up");
      } else {
        // Swiped down - go to previous video
        triggerSlideTransition("down");
      }
    }
  };

  // Handle wheel events for desktop
  const handleWheel = (e) => {
    if (isTransitioning) return;

    // Prevent multiple scroll events from firing too quickly
    if (isScrolling) return;

    setIsScrolling(true);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Increased sensitivity for desktop
    const threshold = isMobile ? 50 : 30;

    // If scrolling down (positive deltaY), go to next video
    if (e.deltaY > threshold) {
      triggerSlideTransition("up");
    }
    // If scrolling up (negative deltaY), go to previous video
    else if (e.deltaY < -threshold) {
      triggerSlideTransition("down");
    } else {
      setIsScrolling(false);
      return;
    }

    // Set a timeout to allow scrolling again after delay
    scrollTimeoutRef.current = setTimeout(
      () => {
        setIsScrolling(false);
      },
      isMobile ? 800 : 600
    ); // Shorter timeout for desktop
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;

      // Prevent handling if already scrolling
      if (isScrolling) return;

      // Down arrow key - go to next video
      if (e.key === "ArrowDown") {
        triggerSlideTransition("up");
      }
      // Up arrow key - go to previous video
      else if (e.key === "ArrowUp") {
        triggerSlideTransition("down");
      } else {
        // If not up/down arrow, don't block scrolling
        return;
      }

      // Set scrolling to true to prevent rapid keypresses
      setIsScrolling(true);

      // Set a timeout to allow scrolling again after delay
      scrollTimeoutRef.current = setTimeout(
        () => {
          setIsScrolling(false);
        },
        isMobile ? 800 : 600
      );
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isScrolling, isTransitioning, isMobile]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      <div
        className="flex justify-center items-end gap-[18px] w-full bg-white overflow-hidden pb-[100px]"
        onWheel={handleWheel}
      >
        {/* Initial loading spinner - when no videos are loaded yet */}
        {isLoading && videoOptions.length === 0 && (
          <div className="absolute inset-0 flex justify-center items-center bg-white z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Empty state - when no videos are found after loading */}
        {!isLoading && videoOptions.length === 0 && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-white z-50">
            <p className="text-lg text-gray-500">No Reels available</p>
          </div>
        )}

        {/* Main container with sliding effect */}
        <div
          ref={slideContainerRef}
          className="w-full h-full relative flex justify-center items-end gap-[18px] "
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Player */}
          <div className="relative w-full h-screen  md:w-auto sm:max-w-[500px] overflow-hidden md:pb-[100px] ">
            <ReelPlayer
              videoUrl={currentVideo?.url}
              onNextVideo={handleNextVideo}
              onPrevVideo={handlePrevVideo}
              videoId={currentVideo?.id}
              isTransitioning={isTransitioning}
              disableSwipe={true} // Disable swipe in the component since we handle it here
            />
            {isMobile && (
              <div className="absolute z-30 bottom-[150px] right-[13px] pb-[20px]">
                <ReelActions
                  initialLikeCount={currentVideo?.likes}
                  commentCount={currentVideo?.comments}
                  videoId={currentVideo?.id}
                  IntitialIsLiked={currentVideo?.isLiked}
                  IntitialIsSaved={currentVideo?.isSaved}
                  AutoScroll={true}
                />
              </div>
            )}
           {console.log("profile of owner is",currentVideo?.owner?.Avatar)}
            <div className="absolute z-30 bottom-[85px] md:bottom-[40px] flex justify-start w-fit pl-[15px] md:pb-[100px] pb-[90px]">
              <ReelOwnerFollow
                profileImg={currentVideo?.owner?.Avatar}
                username={currentVideo?.owner?.UserName}
                InitialIsFollowing={currentVideo?.isFollowing}
                reelId={currentVideo?.id}
              />
            </div>
          </div>

          {!isMobile && (
            <div className="mb-[70px] md:pb-[100px]">
              <ReelActions
                initialLikeCount={currentVideo?.likes || 0}
                commentCount={currentVideo?.comments || 0}
                videoId={currentVideo?.id}
                IntitialIsLiked={currentVideo?.isLiked}
                IntitialIsSaved={currentVideo?.isSaved}
              />
            </div>
          )}
        </div>

        {/* Bottom loading indicator - when loading more videos */}
        {isLoading && videoOptions.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center h-40 z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        {/* ShareModal Container - outside the sliding container */}
        {isShareModalOpen && (
          <div className="absolute z-50 inset-0 bg-opacity-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <ShareModal />
            </div>
          </div>
        )}

        {isCommentOpen && (
          <div className="absolute z-50 top-[150px] bg-opacity-50 p-[12px]">
            <div className="w-full">
              <CommentCompo isReel={true} />
            </div>
          </div>
        )}
        {/* Visual indicator for swipe direction */}
        {/* {touchDelta !== 0 && Math.abs(touchDelta) > 20 && (
          <div
            className={`absolute ${
              touchDelta > 0 ? "top-8" : "bottom-8"
            } left-1/2 transform -translate-x-1/2 bg-black bg-opacity-40 rounded-full p-2 z-50`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              style={{
                transform: touchDelta > 0 ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </div>
        )} */}
      </div>
    </>
  );
};

export default InstagramScroll;
