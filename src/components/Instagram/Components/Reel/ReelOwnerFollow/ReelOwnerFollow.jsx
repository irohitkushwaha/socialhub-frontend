import React, { useState } from "react";

const ReelOwnerFollow = ({ profileImg, username, InitialIsFollowing, ownerId }) => {

  const [isFollowing, setIsFollowing] = useState(InitialIsFollowing);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Profile component (Left side) */}
      <div className="flex-shrink-0 cursor-pointer">
        <div className="w-fit h-fit rounded-ful flex items-center justify-center">
          <div className="w-[42px] h-[42px] rounded-full border-[1px] border-gray-300 overflow-hidden">
            <img
              src={profileImg}
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

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
