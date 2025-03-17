import React from 'react';
import shradha from "../assets/shradha.jpg"
const ChannelDetail = ({ 
  channelName = "Shradha Khapra", 
  subscribers = "4.9M",
  profileImage = shradha
}) => {
  return (
    <div className="flex items-center justify-between w-full lg:w-fit lg:gap-10 px-2 mx-auto py-10">
      {/* Left side - Profile and Channel Info */}
      <div className="flex items-center gap-3">
        {/* Profile Image */}
        <div className="w-[63px] h-[63px] rounded-full overflow-hidden">
          <img 
            src={profileImage} 
            alt={`${channelName} profile`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Channel Info - with 7px gap */}
        <div className=" flex flex-col gap-1.5">
          {/* Channel Name */}
          <h2 className="text-[#181717] text-[18px] lg:text-[20px] font-bold font-inter">
            {channelName}
          </h2>
          
          {/* Subscriber Count */}
          <p className="text-[#414651] text-[15px] font-semibold font-inter">
            {subscribers} Subscribers
          </p>
        </div>
      </div>
      
      {/* Right side - Subscribe Button with 14px gap */}
      <div className="">
        <button className="flex items-center gap-2 px-[10px] py-[8px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]">
          <span className="text-[#414651] text-[15px] font-semibold font-inter">Subscribe</span>
          
          {/* Green Dot */}
          <div className="ml-1 w-2 h-2 rounded-full bg-green-500"></div>
        </button>
      </div>
    </div>
  );
};

export default ChannelDetail; 