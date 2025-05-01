import React from "react";
import shradha from "../../../../assets/shradha.jpg";

const ChatHeader = ({
  name,
  status = "last seen today at 11:06",
  profileImage,
}) => {
  return (
    <div
      className={`w-full px-[12px] md:px-[20px] py-3 flex justify-start items-start gap-[13px] cursor-pointer rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]`}
    >
      {/* Profile Image */}
      <div className="w-[60px] h-[60px] md:w-[69px] md:h-[69px] rounded-full overflow-hidden flex-shrink-0">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-[4px]">
        <span className="text-[20px] text-[#181717] font-bold">{name}</span>
        <span className="text-[15px] text-[#414651] font-semibold">
          {status}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
