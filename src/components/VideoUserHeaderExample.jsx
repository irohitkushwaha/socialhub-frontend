import React from "react";
import VideoUserHeader from "./VideoUserHeader";
import shradha from "../assets/shradha.jpg";
// Sample profile component - replace with your actual profile component
const SampleProfile = () => (
  <div className="w-fit h-fit rounded-ful  flex items-center justify-center">
    <div className="w-[42px] h-[42px] rounded-full border-[1px] border-gray-300 overflow-hidden">
      <img
        src={shradha}
        alt="User profile"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

const VideoUserHeaderExample = () => {
  return (
    <div className=" w-fit">
      <VideoUserHeader
        profileComponent={<SampleProfile />}
        username="@shradhakhapra123"
      />
    </div>
  );
};

export default VideoUserHeaderExample;
