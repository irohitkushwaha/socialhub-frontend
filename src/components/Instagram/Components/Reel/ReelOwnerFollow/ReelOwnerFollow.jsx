import React, { useState } from "react";
import { handleFollow } from "../../../../../utils/reelApiHandlers";
import { isLoggedin } from "../../../../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ReelOwnerFollow = ({
  profileImg,
  username,
  InitialIsFollowing,
  reelId,
  userid,
}) => {
  const [isFollowing, setIsFollowing] = useState(InitialIsFollowing);
  const [showPromptforFollow, setShowPromptforFollow] = useState(false);

  const isUserLoggedin = useSelector(isLoggedin);

  const handleFollowClick = (e) => {
    if (!isUserLoggedin) {
      e.stopPropagation();
      setShowPromptforFollow(true); // (use a local state for prompt)
      setTimeout(() => setShowPromptforFollow(false), 5000);
      return;
    }
    handleFollow(reelId, isFollowing, setIsFollowing);
  };

  useEffect(() => {
    setIsFollowing(InitialIsFollowing);
  }, [InitialIsFollowing]);

  return (
    <div className="relative flex items-center justify-center gap-2">
      {/* Profile component (Left side) */}
      <Link to={`/youtube/channel-detail/${userid}`}>
        <div className="flex-shrink-0 cursor-pointer">
          <div className="w-fit h-fit rounded-ful flex items-center justify-center">
            <div className="w-[42px] h-[42px] rounded-full border-[0px] border-gray-300 overflow-hidden">
              <img
                src={profileImg}
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Link>

      <Link to={`/youtube/channel-detail/${userid}`}>
        {/* Username (Right side) */}
        <div className="text-white text-[16px] font-[550] cursor-pointer tracking-[0.5px] ">
          {username
            ? username.startsWith("@")
              ? username
              : `@${username}`
            : ""}
        </div>
      </Link>

      {/* Dot separator */}
      <div className="w-[5px] h-[5px] bg-white rounded-full "></div>

      {/* Follow button */}
      <button
        onClick={handleFollowClick}
        className="cursor-pointer rounded-[5px] border border-white text-white text-[16px] font-[550] px-[8px] py-[2px] md:px-[10px] md:py-[3px] transition-colors "
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
      {showPromptforFollow && (
        <div
          className="absolute bottom-full left-5 mb-5 z-50 px-[10px] py-[10px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit whitespace-nowrap rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
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
  );
};

export default ReelOwnerFollow;
