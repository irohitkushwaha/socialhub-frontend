import React, { useState, useEffect } from "react";
import ReelPlayer from "../../components/Instagram/Components/Reel/ReelPlayer";
import ReelActions from "../../components/Instagram/Components/Reel/ReelAction";
import ReelOwnerFollow from "../../components/Instagram/Components/Reel/ReelOwnerFollow";
import ShareModal from "../../components/Common/ShareModal";
import { useSelector } from "react-redux";
import { selectIsShareModalOpen } from "../../redux/slices/shareSlice";

// Import local video files
import reels1 from "../../assets/video/reels1.mp4";
import reels2 from "../../assets/video/reels2.mp4";
import reels3 from "../../assets/video/reels3.mp4";
import reels4 from "../../assets/video/reels4.mp4";
import reels5 from "../../assets/video/reels5.mp4";

import shradha from "../../assets/shradha.jpg";
// Sample profile component - replace with your actual profile component
const ReelProfileOwner = () => (
  <div className="w-fit h-fit rounded-ful  flex items-center justify-center">
    <div className="w-[42px] h-[42px] rounded-full border-[1px] border-gray-300 overflow-hidden">
      <img
        src={shradha}
        alt="User profile"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

const ReelPlayerExample = () => {
  // Local MP4 videos from assets
  const videoOptions = [
    {
      id: 1,
      url: reels1,
    },
    {
      id: 2,
      url: reels2,
    },
    {
      id: 3,
      url: reels3,
    },
    {
      id: 4,
      url: reels4,
    },
    {
      id: 5,
      url: reels5,
    },
  ];

  const isShareModalOpen = useSelector(selectIsShareModalOpen);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideo = videoOptions[currentVideoIndex];
  const [isMobile, setIsMobile] = useState(false);

  // Prevent scrolling on the body when this component mounts
  useEffect(() => {
    // Save the original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;

    console.log("the original style for overflow property is", originalStyle);

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
    setCurrentVideoIndex((currentVideoIndex + 1) % videoOptions.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex(
      (currentVideoIndex - 1 + videoOptions.length) % videoOptions.length
    );
  };

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
    <div className="fixed inset-0 flex justify-center items-end gap-[18px] w-full h-screen bg-white overflow-hidden">
      {/* Player with swipe navigation */}
      <div className="relative w-full h-screen md:w-auto sm:max-w-[500px] overflow-hidden md:py-[10px]">
        <ReelPlayer
          videoUrl={currentVideo.url}
          onNextVideo={handleNextVideo}
          onPrevVideo={handlePrevVideo}
        />
        {isMobile && (
          <div className="absolute z-30 bottom-[150px] right-[13px]">
            <ReelActions initialLikeCount={123} commentCount={39} />
          </div>
        )}
        <div className="absolute z-30 bottom-[85px] md:bottom-[40px] flex justify-start w-full pl-[15px]">
          <ReelOwnerFollow
            profileComponent={<ReelProfileOwner />}
            username="@shradhakhapra123"
          />
        </div>

        {/* ShareModal Container */}
        {isShareModalOpen && (
          <div className="absolute z-50 inset-0 bg-opacity-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <ShareModal />
            </div>
          </div>
        )}
      </div>
      {!isMobile && (
        <div className="mb-[70px]">
          <ReelActions initialLikeCount={123} commentCount={39} />
        </div>
      )}
    </div>
  );
};

export default ReelPlayerExample;
