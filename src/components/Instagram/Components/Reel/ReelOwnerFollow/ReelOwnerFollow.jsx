import React, { useState } from "react";

const ReelOwnerFollow = ({ profileComponent, username }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Profile component (Left side) */}
      <div className="flex-shrink-0 cursor-pointer">{profileComponent}</div>

      {/* Username (Right side) */}
      <div className="text-black text-[15px] font-[550] cursor-pointer">
        {username}
      </div>

      {/* Dot separator */}
      <div className="w-[5px] h-[5px] bg-black rounded-full"></div>

      {/* Follow button */}
      <button
        onClick={handleFollowClick}
        className="cursor-pointer rounded-[5px] border border-white text-black text-[16px] font-[550] px-[8px] py-[2px] md:px-[10px] md:py-[3px] transition-colors"
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default ReelOwnerFollow;
