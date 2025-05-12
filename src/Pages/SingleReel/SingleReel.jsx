import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { videoService } from "../../Services/api/Video.Service";
import ReelPlayer from "../../components/Instagram/Components/Reel/ReelPlayer";
import ReelActions from "../../components/Instagram/Components/Reel/ReelAction";
import ReelOwnerFollow from "../../components/Instagram/Components/Reel/ReelOwnerFollow";
import ShareModal from "../../components/Common/ShareModal";
import CommentCompo from "../../components/Common/CommentCompo";
import { selectIsShareModalOpen } from "../../redux/slices/shareSlice";
import { selectIsCommentOpen } from "../../redux/slices/commentSlice";

const SingleReel = () => {

    console.log("SingleReel")

  const { videoid } = useParams(); // Get videoId from URL parameter
  const navigate = useNavigate();

  // States
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Redux selectors
  const isCommentOpen = useSelector(selectIsCommentOpen);
  const isShareModalOpen = useSelector(selectIsShareModalOpen);

  // Fetch the video data
  useEffect(() => {
    const fetchVideoData = async () => {
      if (!videoid) {
        setError("No video ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Fetching video data for video ID:", videoid);
        const videoData = await videoService.getSingleShort(videoid);
        console.log("videoData", videoData);

        if (!videoData) {
          setError("Video not found");
        } else {
          setVideo({
            id: videoData._id,
            url: videoData.VideoFile,
            owner: videoData.Owner,
            likes: videoData.VideoLikesCount,
            comments: videoData.CommentsCount,
            isLiked: videoData.IsLiked,
            isSaved: videoData.IsSaved,
            isFollowing: videoData.IsFollow,
          });
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        setError("Could not load video");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [videoid]);

  // Check if mobile device
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

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black z-50 text-white">
        <p className="text-xl mb-4">{error || "Video not found"}</p>
        <button
          onClick={() => navigate("/reels")}
          className="px-6 py-2 bg-green-500 rounded-lg"
        >
          Browse All Reels
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-end gap-[18px] w-full bg-white overflow-hidden pb-[100px]">
        {/* Main container */}
        <div className="w-full h-full relative flex justify-center items-end gap-[18px]">
          {/* Player */}
          <div className="relative w-full h-screen md:w-auto sm:max-w-[500px] overflow-hidden md:pb-[100px]">
            <ReelPlayer
              videoUrl={video.url}
              disableSwipe={true} // Disable swipe in single view
            />

            {isMobile && (
              <div className="absolute z-30 bottom-[150px] right-[13px] pb-[20px]">
                <ReelActions
                  initialLikeCount={video.likes}
                  commentCount={video.comments}
                  videoId={video.id}
                  IntitialIsLiked={video.isLiked}
                  IntitialIsSaved={video.isSaved}
                  AutoScroll={false}
                />
              </div>
            )}

            <div className="absolute z-30 bottom-[85px] md:bottom-[40px] flex justify-start w-fit pl-[15px] md:pb-[100px] pb-[90px]">
              <ReelOwnerFollow
                profileImg={video.owner?.Avatar}
                username={video.owner?.UserName}
                InitialIsFollowing={video.isFollowing}
                ownerId={video.owner?._id}
              />
            </div>

            {/* Back button
            <button
              onClick={() => navigate("/reels")}
              className="absolute top-4 left-4 p-2 rounded-full bg-black bg-opacity-50 z-40"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button> */}
          </div>

          {!isMobile && (
            <div className="mb-[70px] md:pb-[100px]">
              <ReelActions
                initialLikeCount={video.likes || 0}
                commentCount={video.comments || 0}
                videoId={video.id}
                IntitialIsLiked={video.isLiked}
                IntitialIsSaved={video.isSaved}
              />
            </div>
          )}
        </div>

        {/* ShareModal Container */}
        {isShareModalOpen && (
          <div className="absolute z-50 inset-0 bg-opacity-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <ShareModal />
            </div>
          </div>
        )}

        {/* Comments Container */}
        {isCommentOpen && (
          <div className="absolute z-50 top-[150px] bg-opacity-50 p-[12px]">
            <div className="w-full">
              <CommentCompo isReel={true} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleReel;
