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
import { openShareModal } from "../../../../../redux/slices/shareSlice";
import {
  toggleAutoScroll,
  selectIsAutoScrollEnabled,
} from "../../../../../redux/slices/autoScrollSlice";
import {
  openComment,
  closeComment,
} from "../../../../../redux/slices/commentSlice";

const ReelActions = ({ initialLikeCount = 123, commentCount = 39 }) => {
  const dispatch = useDispatch();
  const isAutoScrollEnabled = useSelector(selectIsAutoScrollEnabled);
  const [isMobile, setIsMobile] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isSaved, setIsSaved] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

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

  // Handle comment button click
  // const handleCommentClick = () => {
  //   console.log("handle comment click is called");
  //   setIsCommentOpen((prev) => !prev);
  //   console.log("isCommentOpen", isCommentOpen);
  //   if (isCommentOpen) {
  //     dispatch(openComment());
  //     console.log("open comment");
  //   } else {
  //     dispatch(closeComment());
  //     console.log("close comment");
  //   }
  // };

  const handleCommentClick = () => {
    setIsCommentOpen((prev) => {
      const newValue = !prev;
      if (newValue) {
        console.log("open comment dispatch is called");
        dispatch(openComment());
      } else {
        console.log("close comment dispatch is called");
        dispatch(closeComment());
      }
      return newValue;
    });
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

  // Handle auto scroll button click
  const handleAutoScroll = () => {
    console.log("handle auto scroll is called");
    dispatch(toggleAutoScroll());
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
          onClick={handleCommentClick}
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

      {/* Auto Scroll button */}
      <div className="flex flex-col items-center gap-[4px] w-[36px] justify-center">
        <button
          onClick={handleAutoScroll}
          className="bg-transparent border-none cursor-pointer"
          aria-label="Auto Scroll"
          style={{
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isAutoScrollEnabled ? (
            // <FontAwesomeIcon
            //   icon={faArrowDownLong}
            //   style={{ fontSize: "29px" }}
            //   color={iconColor}
            // />
            <svg
              key={`autoscroll-off-${isAutoScrollEnabled}`}
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill={iconColor}
              viewBox="0 0 256 256"
            >
              <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          ) : (
            <svg
              key={`autoscroll-on-${isAutoScrollEnabled}`}
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              viewBox="0 -960 960 960"
              width="36px"
              fill={iconColor}
            >
              <path d="M480-80 200-360l56-57 184 184v-287h80v287l184-183 56 56L480-80Zm-40-520v-120h80v120h-80Zm0-200v-80h80v80h-80Z" />
            </svg>
            // <span
            //   className="material-symbols-outlined"
            //   style={{ color: iconColor, fontSize: "36px" }}
            // >
            //   arrow_cool_down
            // </span>
          )}
        </button>
        {/* <span className={`text-sm text-center leading-relaxed font-semibold md:font-medium ${textColor}`}>Auto Scroll</span> */}
      </div>
    </div>
  );
};

export default ReelActions;
