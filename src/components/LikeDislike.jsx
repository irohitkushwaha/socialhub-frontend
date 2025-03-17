import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const LikeDislike = ({ initialLikes = "200K" }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
  };

  return (
    <div className="flex w-fit mx-auto my-5 items-center px-[10px] md:px-[16px] py-[10px] gap-[8px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]">
      {/* Like Button */}
      <button
        className="flex items-center cursor-pointer"
        onClick={handleLike}
        aria-label={liked ? "Unlike" : "Like"}
      >
        {!liked ? (
          <span className="material-icons-outlined text-green-600" style={{ fontSize: '30px'}}>
            thumb_up
          </span>
        ) : (
          <FontAwesomeIcon icon={faThumbsUp} className="text-[30px] text-green-600" />
        )}
      </button>

      {/* Like Count */}
      <span className="text-[15px] font-semibold text-[#414651]">
        {initialLikes}
      </span>

      {/* Divider */}
      <div className="h-5 w-[3px] bg-[#12B76A]"></div>

      {/* Dislike Button */}
      <button
        className="flex items-center cursor-pointer"
        onClick={handleDislike}
        aria-label={disliked ? "Undislike" : "Dislike"}
      >
          {!disliked ? (
          <span className="material-icons-outlined text-green-600" style={{ fontSize: '30px'}}>
            thumb_down
          </span>
        ) : (
          <FontAwesomeIcon icon={faThumbsDown} flip="horizontal"  className="text-[30px] text-green-600 -rotate-[2deg]" />
        )}
      </button>
    </div>
  );
};

export default LikeDislike;
