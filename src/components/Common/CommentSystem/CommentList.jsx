import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const CommentList = ({
  profilePic,
  name = "Rohit Kushwaha",
  timeAgo = "10 Minutes ago",
  text = "This lecture on the String Compression problem is incredibly clear and insightful!",
  likeCount = 5,
  initialLiked = false,
  initialDisliked = false,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [disliked, setDisliked] = useState(initialDisliked);
  const [likes, setLikes] = useState(likeCount);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      if (disliked) {
        setDisliked(false);
      }
      setLikes(likes + 1);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikes(likes - 1);
      }
    }
  };

  return (
    <div className="flex gap-[15px] lg:gap-[22px]">
      {/* Profile Image */}
      <img
        src={profilePic}
        alt={`${name}'s profile`}
        className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] rounded-full object-cover flex-shrink-0"
      />

      {/* Comment Content */}
      <div className="flex flex-col flex-grow gap-[8px] lg:gap-[14px]">
        {/* Name and 
        Time */}
        <div className="flex gap-[12px] lg:gap-[20px] items-center">
          <h4 className="text-[16px] md:text-[18px] font-semibold text-[#414651]">
            {name}
          </h4>
          <span className="text-[14px] md:text-[17px] font-semibold text-[#414651]">
            {timeAgo}
          </span>
        </div>

        <div className="flex flex-col gap-[10px] lg:gap-[14px]">
          {/* Comment Text */}
          <p className="text-[16px] md:text-[18px] font-semibold text-[#414651] leading-[28px]">
            {text}
          </p>

          {/* Like/Dislike Buttons */}
          <div className="flex items-center gap-[24px] h-fit min-h-[35px]">
            {/* Like Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className="focus:outline-none cursor-pointer"
                aria-label={liked ? "Unlike" : "Like"}
              >
                {!liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    viewBox="0 0 24 24"
                    className="w-[28px] h-[28px] lg:w-[28px] lg:h-[28px]"
                    fill="#00c950"
                  >
                    {/* <g>
                  <rect fill="none" height="24" width="24" x="0" y="0" />
                </g> */}
                    <g>
                      <g>
                        <path d="M9,21h9c0.83,0,1.54-0.5,1.84-1.22l3.02-7.05C22.95,12.5,23,12.26,23,12v-2c0-1.1-0.9-2-2-2h-6.31l0.95-4.57l0.03-0.32 c0-0.41-0.17-0.79-0.44-1.06L14.17,1L7.58,7.59C7.22,7.95,7,8.45,7,9v10C7,20.1,7.9,21,9,21z M9,9l4.34-4.34L12,10h9v2l-3,7H9V9z M1,9h4v12H1V9z" />
                      </g>
                    </g>
                  </svg>
                ) : (
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="text-[28px] text-[#00c950]"
                  />
                )}
              </button>
              <span className="text-[17px] font-semibold text-[#414651]">
                {likes}
              </span>
            </div>

            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              className="focus:outline-none cursor-pointer"
              aria-label={disliked ? "Undislike" : "Dislike"}
            >
              {!disliked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  viewBox="0 0 24 24"
                  fill="#00c950"
                  className="w-[28px] h-[28px] lg:w-[28px] lg:h-[28px]"
                  >
                  {/* <g>
                <rect fill="none" height="24" width="24" />
              </g> */}
                  <g>
                    <g>
                      <path d="M15,3H6C5.17,3,4.46,3.5,4.16,4.22l-3.02,7.05C1.05,11.5,1,11.74,1,12v2c0,1.1,0.9,2,2,2h6.31l-0.95,4.57l-0.03,0.32 c0,0.41,0.17,0.79,0.44,1.06L9.83,23l6.59-6.59C16.78,16.05,17,15.55,17,15V5C17,3.9,16.1,3,15,3z M15,15l-4.34,4.34L12,14H3v-2 l3-7h9V15z M19,3h4v12h-4V3z" />
                    </g>
                  </g>
                </svg>
              ) : (
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  flip="horizontal"
                  className="text-[26px] text-[#00c950]"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
