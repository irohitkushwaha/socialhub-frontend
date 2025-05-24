import React, { useState, useEffect, useRef } from "react";
import ReelPlayer from "../../components/Instagram/Components/Reel/ReelPlayer";
import ReelActions from "../../components/Instagram/Components/Reel/ReelAction";
import ReelOwnerFollow from "../../components/Instagram/Components/Reel/ReelOwnerFollow";
import ShareModal from "../../components/Common/ShareModal";
import { useSelector } from "react-redux";
import { selectIsShareModalOpen } from "../../redux/slices/shareSlice";
import {
  selectIsCommentOpen,
  selectActiveItemId,
  selectItemType,
} from "../../redux/slices/commentSlice";
import CommentCompo from "../../components/Common/CommentCompo";
import { videoService } from "../../Services/api/Video.Service";
import { commentService } from "../../Services/api/Comment.Service";

const InstagramScroll = () => {
  const [videoOptions, setVideoOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isCommentOpen = useSelector(selectIsCommentOpen);
  const isShareModalOpen = useSelector(selectIsShareModalOpen);
  const activeItemId = useSelector(selectActiveItemId);
  const itemType = useSelector(selectItemType);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideo = videoOptions[currentVideoIndex] || {};
  const [isMobile, setIsMobile] = useState(false);

  const [CommentResponse, setCommentResponse] = useState([]);
  const [CommentCount, setCommentCount] = useState(0);

  // Add new state for slide transitions
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs
  const slideContainerRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const isActivePost =
    isCommentOpen && activeItemId === currentVideo.id && itemType === "video";

  const shownIds = videoOptions.map((video) => video.id);

  const prevIndex = (currentVideoIndex - 1 + videoOptions.length) % videoOptions.length;

  const nextIndex = (currentVideoIndex + 1) % videoOptions.length;

  // Function to fetch videos
  const fetchVideos = async (page) => {
    if (!hasMore && page > 1) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await videoService.getShortsList(page, 7, shownIds);

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

  const fetchComment = async () => {
    try {
      console.log("video id is", currentVideo.id);
      const response = await commentService.getVideoComments({
        videoId: currentVideo.id,
      });
      setCommentResponse(response.comments);
      setCommentCount(response.commentCount);
    } catch (error) {
      console.log("error in api calling for comment for reels", error.msg);
    }
  };

  useEffect(() => {
    if (isActivePost) {
      fetchComment();
    }
  }, [isActivePost]);

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
    // Apply the transition
    if (slideContainerRef.current) {
      slideContainerRef.current.style.transition = `transform ${
        isMobile ? "0.5s" : "0.3s"
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
        }, 50);
      },
      isMobile ? 500 : 300 //change from 500 to 10 of mobile
    ); // Match this with the transition duration
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
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
        >
          {/* Player */}
          <div className="relative w-full h-screen  md:w-auto sm:max-w-[500px] overflow-hidden md:pb-[100px] ">
            <div
              style={{
                position: "absolute",
                left: "-9999px",
                zIndex: -10,
                visibility: "hidden",
                display: "none",
              }}
            >
              <ReelPlayer
                key={`prev-${videoOptions[prevIndex]?.id}`}
                videoUrl={videoOptions[prevIndex]?.url}
                playing={false}
                muted={true}
              />
            </div>
            <ReelPlayer
              key={`current-${currentVideo?.id}`}
              videoUrl={currentVideo?.url}
              onNextVideo={handleNextVideo}
              onPrevVideo={handlePrevVideo}
              videoId={currentVideo?.id}
              isTransitioning={isTransitioning}
              disableSwipe={false}
            />
            <div
              style={{
                position: "absolute",
                left: "-9999px",
                zIndex: -10,
                visibility: "hidden",
                display: "none",
              }}
            >
              <ReelPlayer
                key={`next-${videoOptions[nextIndex]?.id}`}
                videoUrl={videoOptions[nextIndex]?.url}
                playing={false}
                muted={true}
              />
            </div>

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
            {console.log("profile of owner is", currentVideo?.owner?.Avatar)}
            <div className="absolute z-30 bottom-[85px] md:bottom-[40px] flex justify-start w-fit pl-[15px] md:pb-[100px] pb-[90px]">
              <ReelOwnerFollow
                profileImg={currentVideo?.owner?.Avatar}
                username={currentVideo?.owner?.UserName}
                InitialIsFollowing={currentVideo?.isFollowing}
                reelId={currentVideo?.id}
                userid={currentVideo?.owner?._id}
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
                AutoScroll={true}
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

        {isActivePost && (
          <div className="w-full md:w-auto absolute z-50 top-[150px] md:left-[40%]  bg-opacity-50 md:p-[12px] p-[13px] md:h-[600px]  h-[500px] ">
            <div className="w-full h-full">
              <CommentCompo
                isReel={true}
                CommentCount={CommentCount}
                CommentResponse={CommentResponse}
                videoid={currentVideo.id}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InstagramScroll;
