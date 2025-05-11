import React from "react";

const WatchHistoryVideo = ({
  thumbnailSrc = "https://placehold.co/400x225",
  title = "Video Title Goes Here",
  channelIcon = "https://placehold.co/40x40",
  channelName = "Channel Name",
  views = "10K",
  uploadTime = "2 days ago",
  duration = "9:20",
}) => {
  return (
    <div className="md:w-[1000px] border border-[#E9EAEB] rounded-xl shadow-[0_7px_16px_-4px_rgba(10,13,18,0.08),0_4px_6px_-2px_rgba(10,13,18,0.03)] flex">
      {/* Thumbnail Container */}
      <div className="relative w-[432px] aspect-video rounded-xl p-[2px] gap-[20px]">
        <img
          src={thumbnailSrc}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-1.5 rounded">
          <span className="text-[14px] font-bold text-white">{duration}</span>
        </div>
      </div>

      <div className="flex w-[548px] flex-col gap-[21px] px-[19px] py-[30px] items-start justify-start">
        <h3 className="text-[18px] leading-[31px] font-bold text-[#181D27] line-clamp-2">
          {title}
        </h3>

        {/* Channel Icon */}

        {/* Text Content */}
        <div className="flex gap-[15px] justify-center items-center">
          {/* Title */}

          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={channelIcon}
              alt={channelName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            {/* Channel Name */}
            <span className="text-[16px] font-semibold text-[#414651]">
              {channelName}
            </span>

            {/* Views and Upload Time */}
            <div className="flex items-center gap-1">
              <span className="text-[16px] font-semibold text-[#414651]">
                {views} views
              </span>
              <span className="text-[16px] font-semibold text-[#414651]">
                •
              </span>
              <span className="text-[16px] font-semibold text-[#414651]">
                {uploadTime}
              </span>
            </div>
          </div>
        </div>
      </div>     
    </div>
  );
};

export default WatchHistoryVideo;
