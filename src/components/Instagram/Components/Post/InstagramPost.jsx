import React from "react";
import InstagramPostProfile from "../Post/Components/InstagramPostProfile";
import InstagramPostImage from "../Post/Components/InstagramPostImage";
import PostAction from "../Post/Components/PostAction";
import PostDetails from "../Post/Components/PostDetails";
import apnacollege from "../../../../assets/apna college.jpg";
import shradha from "../../../../assets/shradha.jpg";

function InstagramPost({
  profileImage = shradha,
  username = "@shradhakhapra123",
  isVerified = true,
  timeAgo = "1w",
  likeCount = 1234,
  title = "Enjoying a beautiful day at the beach!, heelo everyone i am here to build a startup #summer #vacation #relaxation",
  isFollow = false,
  imageUrl = apnacollege,
  isLiked = true,
  isSaved = false,
}) {
  return (
    <div className="w-full md:max-w-[500px] mx-auto overflow-x-hidden px-[7px] py-[5px]">
      <div className="w-full flex flex-col gap-[20px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] justify-start px-[3px] pt-[10px] pb-[16px] items-center">
        <div className="w-full px-[5px]">
          <InstagramPostProfile
            profileImage={profileImage}
            username={username}
            isVerified={isVerified}
            timeAgo={timeAgo}
            isFollow={isFollow}
          />
        </div>
        <InstagramPostImage imageUrl={imageUrl} />
        <div className="w-full px-[10px]">
          <PostAction
            isLiked={isLiked}
            isSaved={isSaved}
            likeCount={likeCount}
          />
        </div>
        <div className="w-full px-[10px]">
          <PostDetails likeCount={likeCount} title={title} />
        </div>
      </div>
    </div>
  );
}

export default InstagramPost;
