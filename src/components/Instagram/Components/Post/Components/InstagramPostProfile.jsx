import React, { useState, useEffect } from "react";
import shradha from "../../../../../assets/shradha.jpg";
import { Link } from "react-router-dom";
import { isLoggedin } from "../../../../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
import { subscriptionService } from "../../../../../Services/api/Subscription.Service";

const InstagramPostProfile = ({
  profileImage = shradha,
  username = "@shradhakhapra123",
  isVerified = true,
  timeAgo = "1w",
  InitialIsFollow,
  postId,
  userId
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(InitialIsFollow);
  const [showPromptforFollow, setShowPromptforFollow] = useState(false);

  const isUserLoggedin = useSelector(isLoggedin);

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

  const handleFollowClick = async (e) => {
    if (!isUserLoggedin) {
      e.stopPropagation();
      setShowPromptforFollow(true); // (use a local state for prompt)
      setTimeout(() => setShowPromptforFollow(false), 5000);
      return;
    }
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      const response = await subscriptionService.unsubscribePost(postId);
      console.log("response for follow post is", isFollowing);
    } else {
      const response = await subscriptionService.subscribePost(postId);
      console.log("response for follow post is", response);
    }
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
      <Link to={`/youtube/channel-detail/${userId}`}>
        <div
          className="w-[45px] h-[45px] rounded-full overflow-hidden flex-shrink-0"
        >
          <img
            src={profileImage}
            alt={`${username}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Right side - Different layouts for desktop and mobile */}
      {isMobile ? (
        // Mobile Layout
        <div className="flex flex-col gap-[2px] justify-center items-start">
          {/* Top row: username and verify icon */}
          <div className="flex items-center gap-[10px]">
          <Link to={`/youtube/channel-detail/${userId}`}>
              <span className="text-[19px] font-semibold text-[#414651]">
                {username}
              </span>
            </Link>
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
        <div className="relative flex items-center gap-[8px]">
           <Link to={`/youtube/channel-detail/${userId}`}>
            <span className="text-[20px] font-semibold text-[#414651] ">
              {username}
            </span>
          </Link>

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
          {showPromptforFollow && (
            <div
              className="absolute top-full left-5 mt-5 z-50 px-[10px] py-[10px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit whitespace-nowrap rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
              style={{ wordSpacing: "5px" }}
            >
              Please{" "}
              <span Link className="text-blue-500">
                <Link to="/login">login</Link>
              </span>
              ! to Follow/Unfollow
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstagramPostProfile;
