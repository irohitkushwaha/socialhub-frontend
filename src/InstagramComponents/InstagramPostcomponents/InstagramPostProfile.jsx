import React, { useState, useEffect } from "react";
import shradha from "../../assets/shradha.jpg";

const InstagramPostProfile = ({
  profileImage = shradha,
  username = "@shradhakhapra123",
  isVerified = true,
  timeAgo = "1w",
  // onFollowClick,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    // if (onFollowClick) {
    //   onFollowClick(!isFollowing);
    // }
  };

  // Custom verified badge that doesn't rely on Material Icons
  const VerifiedBadge = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22px"
      viewBox="0 -960 960 960"
      width="22px"
      fill="#12B76A"
    >
      <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
    </svg>
  );

  // Custom small circle icon
  const SmallCircle = () => (
    <div
      className="rounded-full bg-[#414651]"
      style={{ width: "6px", height: "6px" }}
    ></div>
  );

  return (
    <div className="flex justify-start items-center gap-[15px]">
      {/* Left side - Profile Image (same for both mobile and desktop) */}
      <div
        className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0"
        // style={{ flexBasis: "69px" }}
      >
        <img
          src={profileImage}
          alt={`${username}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Different layouts for desktop and mobile */}
      {isMobile ? (
        // Mobile Layout
        <div className="flex flex-col gap-[2px] justify-center items-start">
          {/* Top row: username and verify icon */}
          <div className="flex items-center gap-[10px]">
            <span className="text-[19px] font-semibold text-[#414651]">
              {username}
            </span>
            {isVerified && <VerifiedBadge />}
          </div>

          {/* Bottom row: time, circle, follow button */}
          <div className="flex items-center gap-[10px]">
            <span className="text-[19px] font-semibold text-[#414651]">
              {timeAgo}
            </span>
            <SmallCircle />
            <button
              onClick={handleFollowClick}
              className="text-[19px] text-[#12B76A] font-semibold cursor-pointer text-left min-w-[100px] "
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      ) : (
        // Desktop Layout
        <div className="flex items-center gap-[10px]">
          <span className="text-[20px] font-semibold text-[#414651]">
            {username}
          </span>

          {isVerified && <VerifiedBadge />}

          <SmallCircle />

          <span className="text-[20px] font-semibold text-[#414651]">
            {timeAgo}
          </span>

          <SmallCircle />

          <button
            onClick={handleFollowClick}
            className="text-[20px] text-[#12B76A] font-semibold text-left min-w-[100px] cursor-pointer"
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      )}
    </div>
  );
};

export default InstagramPostProfile;
