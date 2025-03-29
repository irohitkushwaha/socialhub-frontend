import React from "react";
import InstagramPostProfile from "./InstagramPostcomponents/InstagramPostProfile";
import InstagramPostImage from "./InstagramPostcomponents/InstagramPostImage";
import postimage from "../assets/watch/watch1.jpg";
import PostAction from "./InstagramPostcomponents/PostAction";
import PostDetails from "./InstagramPostcomponents/PostDetails";
import apnacollege from "../assets/apna college.jpg";

function InstagramPost() {
  const postData = {
    likeCount: 1234,
    title:
      "Enjoying a beautiful day at the beach!, heelo everyone i am here to build a startup #summer #vacation #relaxation",
  };

  return (
    <div className="w-full md:w-fit mx-auto mt-2.5 overflow-x-hidden px-[7px] py-[20px]">
      <div className="w-full flex flex-col gap-[20px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] justify-start px-[3px] pt-[10px] pb-[16px] items-center">
        <div className="w-full px-[10px]">
          <InstagramPostProfile />
        </div>
        <InstagramPostImage imageUrl={apnacollege} />
        <div className="w-full px-[10px]">
          <PostAction />
        </div>
        <div className="w-full px-[10px]">
          <PostDetails likeCount={postData.likeCount} title={postData.title} />
        </div>
      </div>
    </div>
  );
}

export default InstagramPost;
