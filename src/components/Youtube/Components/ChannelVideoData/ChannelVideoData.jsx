import React, { useState, useEffect } from "react";
import shradha from "../../../../assets/shradha.jpg";
import { Link } from "react-router-dom";
import SubscribeBtn from "../SubscribeBtn";

const ChannelVideoData = ({
  channelName = "Shradha Khapra",
  subscribers = "4.9M",
  profileImage = shradha,
  isSubscribed,
}) => {
  return (
    <>
      <div className="flex items-center justify-between sm:justify-normal w-full lg:w-fit sm:gap-[25px] md:px-2">
        {/* Left side - Profile and Channel Info */}
        <div className="flex items-center gap-[7px] md:gap-[9px]">
          {/* Profile Image */}
          <Link to={`/youtube/channel-detail`}>
            <div className="w-[48px] h-[48px] md:w-[55px] md:h-[55px] rounded-full overflow-hidden">
              <img
                src={profileImage}
                alt={`${channelName} profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Channel Info */}
          <div className="flex flex-col gap-[4px] md:gap-1.5">
            <Link to={`/youtube/channel-detail`}>
              <h2 className="text-[#181717] text-[16px] md:text-[18px] font-bold font-inter">
                {channelName}
              </h2>
            </Link>
            <p className="text-[#414651] text-[16px] md:text-[17px] font-bold font-inter">
              {subscribers} Subscribers
            </p>
          </div>

        </div>
        <SubscribeBtn isSubscribed={isSubscribed} />
      </div>
    </>
  );
};

export default ChannelVideoData;