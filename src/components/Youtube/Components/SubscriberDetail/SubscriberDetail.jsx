import React from "react";

const SubscriberDetail = ({
  name = "Shradha Khapra",
  id = "@shradhakhapra123",
  subscribers = "4.9M",
  videos = "550",
}) => {
  return (
    <div className="flex flex-col items-start gap-[12px] sm:gap-6">
      {/* Name */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#181717]">{name}</h1>

      {/* Channel ID */}
      <p className="text-lg sm:text-xl font-semibold text-[#414651]">{id}</p>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-[12px]">
        <p className="text-lg sm:text-xl font-semibold text-[#414651]">
          {subscribers} Subscribers
        </p>
        <p className="text-lg sm:text-xl font-semibold text-[#414651]">
          {videos} Videos
        </p>
      </div>
    </div>
  );
};

export default SubscriberDetail;
