import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { openShareModal } from "../redux/slices/shareSlice";

const ReelActions = ({ initialLikeCount = 123, commentCount = 39 }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isSaved, setIsSaved] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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

  const iconColor = isMobile ? "white" : "#262626";
  const textColor = isMobile ? "text-white" : "text-black";

  return (
    <div className="flex flex-col gap-[23px] items-center justify-center">
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
              color="#ff3040"
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              style={{ fontSize: "29px" }}
              color={iconColor}
            />
          )}
        </button>
        <span className={`text-sm font-medium ${textColor}`}>{likeCount}</span>
      </div>

      {/* Comment button */}
      <div className="flex flex-col items-center">
        <button
          className="bg-transparent border-none cursor-pointer mb-1"
          aria-label="Comment"
        >
          <FontAwesomeIcon
            icon={faComment}
            style={{ fontSize: "29px" }}
            color={iconColor}
          />
        </button>
        <span className={`text-sm font-medium ${textColor}`}>
          {commentCount}
        </span>
      </div>

      {/* Share button */}
      <div className="flex flex-col items-center">
        <button
          className="bg-transparent border-none cursor-pointer mb-1"
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

      {/* Save button */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleSave}
          className="bg-transparent border-none cursor-pointer"
          aria-label="Save"
          style={{
            width: "36px",
            height: "36px",
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
  );
};

export default ReelActions;
