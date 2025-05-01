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

  console.log("isCommentOpen in instagram page is", isCommentOpen);

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



// import React, { useState, useEffect, useRef } from "react";
// import ReelPlayer from "../../components/Instagram/Components/Reel/ReelPlayer";
// import ReelActions from "../../components/Instagram/Components/Reel/ReelAction";
// import ReelOwnerFollow from "../../components/Instagram/Components/Reel/ReelOwnerFollow";
// import ShareModal from "../../components/Common/ShareModal";
// import { useSelector } from "react-redux";
// import { selectIsShareModalOpen } from "../../redux/slices/shareSlice";

// // Import local video files
// import reels1 from "../../assets/video/reels1.mp4";
// import reels2 from "../../assets/video/reels2.mp4";
// import reels3 from "../../assets/video/reels3.mp4";
// import reels4 from "../../assets/video/reels4.mp4";
// import reels5 from "../../assets/video/reels5.mp4";

// import shradha from "../../assets/shradha.jpg";
// // Sample profile component - replace with your actual profile component
// const ReelProfileOwner = () => (
//   <div className="w-fit h-fit rounded-ful flex items-center justify-center">
//     <div className="w-[42px] h-[42px] rounded-full border-[1px] border-gray-300 overflow-hidden">
//       <img
//         src={shradha}
//         alt="User profile"
//         className="w-full h-full object-cover"
//       />
//     </div>
//   </div>
// );

// const ReelPlayerExample = () => {
//   // Local MP4 videos from assets
//   const videoOptions = [
//     {
//       id: 1,
//       url: reels1,
//     },
//     {
//       id: 2,
//       url: reels2,
//     },
//     {
//       id: 3,
//       url: reels3,
//     },
//     {
//       id: 4,
//       url: reels4,
//     },
//     {
//       id: 5,
//       url: reels5,
//     },
//   ];

//   const isShareModalOpen = useSelector(selectIsShareModalOpen);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const currentVideo = videoOptions[currentVideoIndex];
//   const [isMobile, setIsMobile] = useState(false);

//   // Add new state for slide transitions
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [slideDirection, setSlideDirection] = useState(null);
//   const [startY, setStartY] = useState(0);
//   const [touchDelta, setTouchDelta] = useState(0);
//   const [isScrolling, setIsScrolling] = useState(false);
  
//   // Refs
//   const slideContainerRef = useRef(null);
//   const scrollTimeoutRef = useRef(null);
//   const transitionTimeoutRef = useRef(null);

//   // Prevent scrolling on the body when this component mounts
//   useEffect(() => {
//     // Save the original styles
//     const originalStyle = window.getComputedStyle(document.body).overflow;

//     console.log("the original style for overflow property is", originalStyle);

//     // Prevent scrolling on body
//     document.body.style.overflow = "hidden";
//     document.documentElement.style.overflow = "hidden";

//     // Restore original styles when component unmounts
//     return () => {
//       document.body.style.overflow = originalStyle;
//       document.documentElement.style.overflow = "";
//     };
//   }, []);

//   const handleNextVideo = () => {
//     if (isTransitioning) return;
//     triggerSlideTransition('up');
//   };

//   const handlePrevVideo = () => {
//     if (isTransitioning) return;
//     triggerSlideTransition('down');
//   };

//   // Trigger the slide transition
//   const triggerSlideTransition = (direction) => {
//     if (isTransitioning) return; // Prevent multiple transitions
    
//     setIsTransitioning(true);
//     setSlideDirection(direction);

//     // Apply the transition
//     if (slideContainerRef.current) {
//       slideContainerRef.current.style.transition = `transform ${isMobile ? '0.5s' : '0.4s'} ease-out`;
      
//       if (direction === 'up') {
//         slideContainerRef.current.style.transform = 'translateY(-100%)';
//       } else {
//         slideContainerRef.current.style.transform = 'translateY(100%)';
//       }
//     }

//     // After transition completes, change the video and reset
//     transitionTimeoutRef.current = setTimeout(() => {
//       if (direction === 'up') {
//         setCurrentVideoIndex((currentVideoIndex + 1) % videoOptions.length);
//       } else {
//         setCurrentVideoIndex((currentVideoIndex - 1 + videoOptions.length) % videoOptions.length);
//       }

//       // Reset the transform immediately (no transition)
//       if (slideContainerRef.current) {
//         slideContainerRef.current.style.transition = 'none';
//         slideContainerRef.current.style.transform = 'translateY(0)';
//       }

//       // Reset transition flags after a short delay
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setSlideDirection(null);
//       }, 50);
//     }, isMobile ? 500 : 400); // Match this with the transition duration
//   };

//   // Handle touch events for mobile
//   const handleTouchStart = (e) => {
//     if (isTransitioning) return;
//     setStartY(e.touches[0].clientY);
//     setTouchDelta(0);
//   };

//   const handleTouchMove = (e) => {
//     if (isTransitioning) return;
//     const currentY = e.touches[0].clientY;
//     const delta = startY - currentY;
//     setTouchDelta(delta);

//     // Move the reel container based on touch
//     if (slideContainerRef.current) {
//       const translateY = -delta * 0.5; // Dampen the movement
//       slideContainerRef.current.style.transform = `translateY(${translateY}px)`;
//     }
//   };

//   const handleTouchEnd = (e) => {
//     if (isTransitioning) return;
    
//     const endY = e.changedTouches[0].clientY;
//     const diff = startY - endY;

//     // Reset the touch move transform
//     if (slideContainerRef.current) {
//       slideContainerRef.current.style.transition = 'transform 0.3s ease-out';
//       slideContainerRef.current.style.transform = 'translateY(0)';
      
//       // Remove the transition after it completes
//       setTimeout(() => {
//         if (slideContainerRef.current) {
//           slideContainerRef.current.style.transition = '';
//         }
//       }, 300);
//     }

//     // If swipe distance is greater than threshold, consider it a valid swipe
//     if (Math.abs(diff) > 80) { // Increased threshold for better UX
//       if (diff > 0) {
//         // Swiped up - go to next video
//         triggerSlideTransition('up');
//       } else {
//         // Swiped down - go to previous video
//         triggerSlideTransition('down');
//       }
//     }
//   };

//   // Handle wheel events for desktop
//   const handleWheel = (e) => {
//     if (isTransitioning) return;
    
//     // Prevent multiple scroll events from firing too quickly
//     if (isScrolling) return;

//     setIsScrolling(true);

//     // Clear any existing timeout
//     if (scrollTimeoutRef.current) {
//       clearTimeout(scrollTimeoutRef.current);
//     }

//     // Increased sensitivity for desktop
//     const threshold = isMobile ? 50 : 30;

//     // If scrolling down (positive deltaY), go to next video
//     if (e.deltaY > threshold) {
//       triggerSlideTransition('up');
//     }
//     // If scrolling up (negative deltaY), go to previous video
//     else if (e.deltaY < -threshold) {
//       triggerSlideTransition('down');
//     } else {
//       setIsScrolling(false);
//       return;
//     }

//     // Set a timeout to allow scrolling again after delay
//     scrollTimeoutRef.current = setTimeout(() => {
//       setIsScrolling(false);
//     }, isMobile ? 800 : 600); // Shorter timeout for desktop
//   };

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (isTransitioning) return;
      
//       // Prevent handling if already scrolling
//       if (isScrolling) return;

//       // Down arrow key - go to next video
//       if (e.key === "ArrowDown") {
//         triggerSlideTransition('up');
//       }
//       // Up arrow key - go to previous video
//       else if (e.key === "ArrowUp") {
//         triggerSlideTransition('down');
//       } else {
//         // If not up/down arrow, don't block scrolling
//         return;
//       }

//       // Set scrolling to true to prevent rapid keypresses
//       setIsScrolling(true);
      
//       // Set a timeout to allow scrolling again after delay
//       scrollTimeoutRef.current = setTimeout(() => {
//         setIsScrolling(false);
//       }, isMobile ? 800 : 600);
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isScrolling, isTransitioning, isMobile]);

//   // Cleanup timeouts on unmount
//   useEffect(() => {
//     return () => {
//       if (scrollTimeoutRef.current) {
//         clearTimeout(scrollTimeoutRef.current);
//       }
//       if (transitionTimeoutRef.current) {
//         clearTimeout(transitionTimeoutRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     // Initial check
//     checkIfMobile();

//     // Add event listener for window resize
//     window.addEventListener("resize", checkIfMobile);

//     // Cleanup
//     return () => window.removeEventListener("resize", checkIfMobile);
//   }, []);

//   return (
//     <div 
//       className="fixed inset-0 flex justify-center items-end gap-[18px] w-full h-screen bg-white overflow-hidden"
//       onWheel={handleWheel}
//     >
//       {/* Main container with sliding effect */}
//       <div 
//         ref={slideContainerRef}
//         className="w-full h-full relative flex justify-center items-end gap-[18px]"
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {/* Player */}
//         <div className="relative w-full h-screen md:w-auto sm:max-w-[500px] overflow-hidden md:py-[10px]">
//           <ReelPlayer
//             videoUrl={currentVideo.url}
//             onNextVideo={handleNextVideo}
//             onPrevVideo={handlePrevVideo}
//             isTransitioning={isTransitioning}
//             disableSwipe={true} // Disable swipe in the component since we handle it here
//           />
//           {isMobile && (
//             <div className="absolute z-30 bottom-[150px] right-[13px]">
//               <ReelActions initialLikeCount={123} commentCount={39} />
//             </div>
//           )}
//           <div className="absolute z-30 bottom-[85px] md:bottom-[40px] flex justify-start w-full pl-[15px]">
//             <ReelOwnerFollow
//               profileComponent={<ReelProfileOwner />}
//               username="@shradhakhapra123"
//             />
//           </div>
//         </div>
        
//         {!isMobile && (
//           <div className="mb-[70px]">
//             <ReelActions initialLikeCount={123} commentCount={39} />
//           </div>
//         )}
//       </div>

//       {/* ShareModal Container - outside the sliding container */}
//       {isShareModalOpen && (
//         <div className="absolute z-50 inset-0 bg-opacity-50 flex items-center justify-center p-4">
//           <div className="max-w-md w-full">
//             <ShareModal />
//           </div>
//         </div>
//       )}
      
//       {/* Visual indicator for swipe direction */}
//       {touchDelta !== 0 && Math.abs(touchDelta) > 20 && (
//         <div className={`absolute ${touchDelta > 0 ? 'top-8' : 'bottom-8'} left-1/2 transform -translate-x-1/2 bg-black bg-opacity-40 rounded-full p-2 z-50`}>
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="white"
//             style={{ transform: touchDelta > 0 ? 'rotate(180deg)' : 'rotate(0deg)' }}
//           >
//             <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
//           </svg>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReelPlayerExample;