import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faPaperPlane,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { openShareModal } from "../../../../../redux/slices/shareSlice";
import { isLoggedin } from "../../../../../redux/slices/authentication.slice";
import { Link } from "react-router-dom";
import { savedService } from "../../../../../Services/api/Saved.Service";
import {
  openComment,
  closeComment,
  selectIsCommentOpen,
} from "../../../../../redux/slices/commentSlice";

const PostAction = ({ InitialIsLiked, InitialIsSaved, handleLike, postId }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(InitialIsLiked);
  const [isSaved, setIsSaved] = useState(InitialIsSaved);
  const [showPromptforLike, setShowPromptforLike] = useState(false);
  const [showPromptforSave, setShowPromptforSave] = useState(false);

  const isUserLoggedin = useSelector(isLoggedin);
  const isCommentOpen = useSelector(selectIsCommentOpen);

  useEffect(() => {
    setIsLiked(InitialIsLiked);
    setIsSaved(InitialIsSaved);
  }, [InitialIsLiked, InitialIsSaved]);

  const handleCommentClick = () => {
    if (isCommentOpen) {
      dispatch(closeComment());
    } else {
      dispatch(openComment({ id: postId, type: "post" }));
    }
  };

  // Handle like button click
  const handleLikeClick = (e) => {
    if (!isUserLoggedin) {
      e.stopPropagation();
      setShowPromptforLike(true); // (use a local state for prompt)
      setTimeout(() => setShowPromptforLike(false), 5000);
      return;
    }
    handleLike();
  };

  // Handle save button click
  const handleSave = async (e) => {
    if (!isUserLoggedin) {
      e.stopPropagation();
      setShowPromptforSave(true); // (use a local state for prompt)
      setTimeout(() => setShowPromptforSave(false), 5000);
      return;
    }
    setIsSaved(!isSaved);
    if (isSaved) {
      const response = await savedService.deleteSavePost(postId);
      console.log("response for delete save post is ", response);
    } else {
      const response = await savedService.savePost(postId);
      console.log("response for save post is ", response);
    }
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
        <div className="relative flex flex-col items-center justify-center gap-[4px]">
          <button
            onClick={handleLikeClick}
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
          {showPromptforLike && (
            <div
              className="absolute top-full md:left-5 left-0 md:mt-0 mt-2 z-50 px-[10px] py-[10px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit whitespace-nowrap rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
              style={{ wordSpacing: "5px" }}
            >
              Please{" "}
              <span Link className="text-blue-500">
                <Link to="/login">login</Link>
              </span>
              ! to Like/Dislike Reel
            </div>
          )}
        </div>

        {/* Comment button */}
        <div className="flex flex-col items-center">
          <button
            className="bg-transparent border-none cursor-pointer"
            aria-label="Comment"
            onClick={handleCommentClick}
          >
            <FontAwesomeIcon
              icon={faComment}
              style={{ fontSize: "29px" }}
              color={iconColor}
            />
          </button>
        </div>
      </div>
      <div>
        {/* Save button */}
        <div className="relative flex flex-col items-center">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                fill={iconColor}
              >
                <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
              </svg>
            )}
          </button>
          {showPromptforSave && (
            <div
              className="absolute top-full md:right-full right-0 mt-3 z-50 px-[10px] py-[10px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit whitespace-nowrap rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
              style={{ wordSpacing: "5px" }}
            >
              Please{" "}
              <span Link className="text-blue-500">
                <Link to="/login">login</Link>
              </span>
              ! to Save/Unsave Reel
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostAction;
