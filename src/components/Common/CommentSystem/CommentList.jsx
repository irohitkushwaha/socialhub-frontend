import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Comment = ({
  profilePic = "https://via.placeholder.com/64",
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
        className="w-[50px] h-[50px] md:w-[64px] md:h-[64px] rounded-full object-cover flex-shrink-0"
      />

      {/* Comment Content */}
      <div className="flex flex-col flex-grow gap-[8px] lg:gap-[14px]">
        {/* Name and 
        Time */}
        <div className="flex gap-[12px] lg:gap-[20px] items-center">
          <h4 className="text-[18px] md:text-[22px] font-semibold text-[#414651]">
            {name}
          </h4>
          <span className="text-[16px] md:text-[20px] font-semibold text-[#414651]">
            {timeAgo}
          </span>
        </div>

        <div class="flex flex-col gap-[8px] lg:gap-[14px]">
          {/* Comment Text */}
          <p className="text-[18px] md:text-[22px] font-semibold text-[#414651] leading-[33px]">
            {text}
          </p>

          {/* Like/Dislike Buttons */}
          <div className="flex items-center gap-5">
            {/* Like Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className="focus:outline-none cursor-pointer"
                aria-label={liked ? "Unlike" : "Like"}
              >
                {!liked ? (
                  <span
                    className="material-symbols-outlined text-green-600"
                    style={{ fontSize: "30px" }}
                  >
                    thumb_up
                  </span>
                ) : (
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="text-[30px] text-green-600"
                  />
                )}
              </button>
              <span className="text-[20px] font-semibold text-[#414651]">
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
                <span
                  className="material-symbols-outlined text-green-600"
                  style={{ fontSize: "30px" }}
                >
                  thumb_down
                </span>
              ) : (
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  flip="horizontal"
                  className="text-[30px] text-green-600 -rotate-[2deg]"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentList = ({ comments = [] }) => {
  // If no comments provided, use this sample data
  const sampleComments = [
    {
      id: 1,
      profilePic: "https://via.placeholder.com/64",
      name: "Rohit Kushwaha",
      timeAgo: "10 Minutes ago",
      text: "This lecture on the String Compression problem is incredibly clear and insightful!",
      likeCount: 5,
      initialLiked: false,
      initialDisliked: false,
    },
    {
      id: 2,
      profilePic: "https://via.placeholder.com/64",
      name: "Ananya Singh",
      timeAgo: "2 Hours ago",
      text: "The explanation of time complexity analysis really helped me understand the problem better.",
      likeCount: 12,
      initialLiked: true,
      initialDisliked: false,
    },
  ];

  const commentData = comments.length > 0 ? comments : sampleComments;

  return (
    <div className="w-full space-y-6">
      {commentData.map((comment) => (
        <Comment
          key={comment.id}
          profilePic={comment.profilePic}
          name={comment.name}
          timeAgo={comment.timeAgo}
          text={comment.text}
          likeCount={comment.likeCount}
          initialLiked={comment.initialLiked}
          initialDisliked={comment.initialDisliked}
        />
      ))}
    </div>
  );
};

export default CommentList;
