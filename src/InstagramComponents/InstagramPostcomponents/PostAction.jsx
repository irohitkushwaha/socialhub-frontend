import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faPaperPlane,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faBookmark,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { openShareModal } from "../../redux/slices/shareSlice";
import {
  toggleAutoScroll,
  selectIsAutoScrollEnabled,
} from "../../redux/slices/autoScrollSlice";

const ReelActions = () => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(5);
  const [isSaved, setIsSaved] = useState(false);

  // Handle like button click
  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
    setIsLiked(!isLiked);
  };

  // Handle save button click
  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Handle share button click
  const handleShareClick = () => {
    dispatch(
      openShareModal({
        url: window.location.href,
        title: "Check out this video!",
      })
    );
  };

  const iconColor = "#12B76A";

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex gap-[23px] items-center justify-center">
        {/* Like button */}
        <div className="flex flex-col items-center justify-center gap-[4px]">
          <button
            onClick={handleLike}
            className="bg-transparent border-none cursor-pointer"
            aria-label="Like"
          >
            {isLiked ? (
              <FontAwesomeIcon
                icon={faHeartSolid}
                style={{ fontSize: "29px" }}
                color="#12B76A"
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: "29px" }}
                color={iconColor}
              />
            )}
          </button>
        </div>

        {/* Comment button */}
        <div className="flex flex-col items-center">
          <button
            className="bg-transparent border-none cursor-pointer"
            aria-label="Comment"
          >
            <FontAwesomeIcon
              icon={faComment}
              style={{ fontSize: "29px" }}
              color={iconColor}
            />
          </button>
        </div>

        {/* Share button */}
        <div className="flex flex-col items-center">
          <button
            className="bg-transparent border-none cursor-pointer"
            aria-label="Share"
            onClick={handleShareClick}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{ fontSize: "29px" }}
              color={iconColor}
            />
          </button>
        </div>
      </div>
      <div>
        {/* Save button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleSave}
            className="bg-transparent border-none cursor-pointer"
            aria-label="Save"
            style={{
              width: "29px",
              height: "29px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isSaved ? (
              <FontAwesomeIcon
                icon={faBookmarkSolid}
                style={{ fontSize: "29px" }}
                color={iconColor}
              />
            ) : (
              <span
                className="material-icons"
                style={{ color: iconColor, fontSize: "36px" }}
              >
                bookmark_border
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelActions;
