import React from 'react';

const ThumbnailCard = ({ 
  thumbnailSrc = "https://placehold.co/400x225",
  title = "Video Title Goes Here",
  channelIcon = "https://placehold.co/40x40",
  channelName = "Channel Name",
  views = "10K",
  uploadTime = "2 days ago",
  duration = "9:20"
}) => {
  return (
    <div class="w-[364px] mx-1.5 lg:mx-0 lg:w-[375px] border border-[#E9EAEB] rounded-xl shadow-[0_7px_16px_-4px_rgba(10,13,18,0.08),0_4px_6px_-2px_rgba(10,13,18,0.03)]">
      {/* Thumbnail Container */}
      <div class="relative w-full aspect-video rounded-xl overflow-hidden">
        <div class="p-[2px] ">
          <img 
            src={thumbnailSrc} 
            alt={title}
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
        {/* Duration Badge */}
        <div class="absolute bottom-2 right-2 bg-black bg-opacity-80 px-1.5 rounded">
          <span class="text-[14px] font-bold text-white">
            {duration}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div class="flex gap-3 p-3">
        {/* Channel Icon */}
        <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={channelIcon} 
            alt={channelName}
            class="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div class="flex flex-col gap-[8px]">
          {/* Title */}
          <h3 class="text-[18px] font-bold text-[#181D27] line-clamp-2">
            {title}
          </h3>

          {/* Channel Name */}
          <span class="text-[16px] font-semibold text-[#414651]">{channelName}</span>

          {/* Views and Upload Time */}
          <div class="flex items-center gap-[6px]">
            <span class="text-[16px] font-semibold text-[#414651]">{views} views</span>
            <span class="text-[16px] font-semibold text-[#414651]">•</span>
            <span class="text-[16px] font-semibold text-[#414651]">{uploadTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCard; 