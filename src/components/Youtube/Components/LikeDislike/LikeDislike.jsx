import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { isLoggedin } from "../../../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const LikeDislike = ({
  initialLikes = 0,
  isDisliked = false,
  isLiked = false,
  handleLike,
  handleDislike,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [disliked, setDisliked] = useState(isDisliked);
  const [showPrompt, setShowPrompt] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const isUserLogged = useSelector(isLoggedin);

  const onLikeClick = (e) => {
    if (!isUserLogged) {
      e.stopPropagation();
      setShowPrompt(true); // (use a local state for prompt)
      setTimeout(() => setShowPrompt(false), 5000);
      return;
    }
    setLiked(!liked);
    if (!liked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }
    if (disliked) {
      setDisliked(false);
    }
    if (handleLike) handleLike();
  };

  useEffect(() => {
    setLiked(isLiked);
    setDisliked(isDisliked);
  }, [isLiked, isDisliked]);

  useEffect(() => {
    setLikesCount(initialLikes);
  }, [initialLikes]);

  const onDislikeClick = (e) => {
    if (!isUserLogged) {
      e.stopPropagation();
      setShowPrompt(true); // (use a local state for prompt)
      setTimeout(() => setShowPrompt(false), 5000);
      return;
    }
    setDisliked(!disliked);
    // setLikesCount((prev) => prev - 1);
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    }
    if (handleDislike) handleDislike();
  };

  return (
    <div className="relative flex w-fit items-center px-[8px] lg:px-[10px] py-[6px] lg:py-[7px] gap-[8px] lg:gap-[10px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]">
      {/* Like Button */}
      <button
        className="flex items-center cursor-pointer gap-[8px]"
        onClick={onLikeClick}
        aria-label={liked ? "Unlike" : "Like"}
      >
        {!liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            className="w-[23px] h-[23px] lg:w-[25px] lg:h-[25px]"
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
            className="text-[23px] lg:text-[25px] text-[#00c950]"
          />
        )}
        <span className="text-[13px] lg:text-[15px] font-semibold text-[#414651]">
          {likesCount}
        </span>
      </button>

      {/* Like Count */}

      {/* Divider */}
      <div className="h-4 lg:h-[18px] w-[2.5px] lg:w-[3px] bg-[#00c950]"></div>

      {/* Dislike Button */}
      <button
        className="flex items-center cursor-pointer"
        onClick={onDislikeClick}
        aria-label={disliked ? "Undislike" : "Dislike"}
      >
        {!disliked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            fill="#00c950"
            className="w-[23px] h-[23px] lg:w-[25px] lg:h-[25px]"
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
            className="text-[23px] lg:text-[25px] text-[#00c950] -rotate-[2deg]"
          />
        )}
      </button>
      {showPrompt && (
        <div
          className="absolute top-full left-3 mt-4 z-50 px-[10px] py-[10px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit whitespace-nowrap rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
          style={{ wordSpacing: "5px" }}
        >
          Please{" "}
          <span Link className="text-blue-500">
            <Link to="/login">login</Link>
          </span>
          ! to Like/Dislike
        </div>
      )}
    </div>
  );
};

export default LikeDislike;
