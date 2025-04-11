import WatchHistoryVideo from "./watchhistoryvideo";
import thumbnail1 from "../assets/thumbnail1.webp";
import channelIcon from "../assets/channels4_profile.jpg";
import React from "react";

function watchhistoryvideoexample() {
  return (
    <div className="hidden w-full mt-8 lg:flex flex-col">
      {/* ThumbnailCards */}
      <div className="flex-1 flex flex-col gap-[40px] justify-center">
        <WatchHistoryVideo
          thumbnailSrc={thumbnail1}
          title="String Compression problem - Lecture 32 | Leetcode 443"
          channelIcon={channelIcon}
          channelName="React Masters"
          views="50K"
          uploadTime="3 days ago"
          duration="9:20"
        />
        <WatchHistoryVideo
          thumbnailSrc={thumbnail1}
          title="How to Build a React App in 10 Minutes"
          channelIcon={channelIcon}
          channelName="React Masters"
          views="50K"
          uploadTime="3 days ago"
          duration="9:20"
        />
        <WatchHistoryVideo
          thumbnailSrc={thumbnail1}
          title="How to Build a React App in 10 Minutes"
          channelIcon={channelIcon}
          channelName="React Masters"
          views="50K"
          uploadTime="3 days ago"
          duration="9:20"
        />
      </div>
    </div>
  );
}

export default watchhistoryvideoexample;
