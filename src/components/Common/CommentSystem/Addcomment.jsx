import React, { useState, useRef, useEffect } from "react";
import ButtonVideo from "../../Youtube/Components/ButtonVideo/ButtonVideo";
import {
  isLoggedin,
  getUserData,
} from "../../../redux/slices/authentication.slice";
import UnnamedImg from "../../../assets/unnamed (1).png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { commentService } from "../../../Services/api/Comment.Service";

const AddComment = ({ videoId, postId }) => {
  const [commentText, setCommentText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const [addCommentProfile, setAddCommentProfile] = useState();

  const isUserLogged = useSelector(isLoggedin);
  const getUserAvatar = useSelector(getUserData);

  useEffect(() => {
    isUserLogged
      ? setAddCommentProfile(getUserAvatar.avatar)
      : setAddCommentProfile(UnnamedImg);
  }, [isLoggedin]);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";
      // Set the height to scrollHeight to fit all content
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [commentText]);

  // Add this useEffect to sync the div content with state
  useEffect(() => {
    if (
      textareaRef.current &&
      textareaRef.current.textContent !== commentText
    ) {
      textareaRef.current.textContent = commentText;
    }
  }, [commentText]);

  const handleFocus = (e) => {
    console.log("is focused executed");
    if (!isUserLogged) {
      e.stopPropagation();
      setShowPrompt(true); // (use a local state for prompt)
      setTimeout(() => setShowPrompt(false), 5000);
      return;
    }
    setIsFocused(true);
  };

  const handleCancel = () => {
    setCommentText("");
    if (textareaRef.current) {
      textareaRef.current.textContent = "";
    }
    setIsFocused(false);
  };

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      if (videoId) {
        await commentService.saveVideoComment({
          videoId,
          content: commentText,
        });
      } else if (postId) {
        await commentService.savePostComment({
          postId,
          content: commentText,
        });
      }

      setCommentText("");
      if (textareaRef.current) textareaRef.current.textContent = "";
      setIsFocused(false);
    } catch (error) {
      alert("Failed to post comment. Please try again.");
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-[25px] py-[25px]">
      <div className="flex items-center gap-[15px] w-full">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={addCommentProfile}
            alt="Profile"
            className="w-[45px] h-[45px] lg:w-[55px] lg:h-[55px] rounded-full object-cover"
          />
        </div>

        {/* Comment Input Area */}
        <div className="flex w-full">
          <div className="w-full">
            <div
              ref={textareaRef}
              contentEditable={isUserLogged}
              onInput={
                isUserLogged
                  ? (e) => setCommentText(e.currentTarget.textContent || "")
                  : undefined
              }
              onClick={handleFocus}
              onFocus={handleFocus}
              className="py-[10px] w-full text-start border-b-[3px] border-[#E6E6E6] focus:outline-none text-[16px]  md:text-[18px] font-semibold text-[#3f3f3f] bg-transparent min-h-[30px] overflow-hidden empty:before:content-[attr(data-placeholder)] empty:before:text-[#686C73] empty:before:opacity-70"
              data-placeholder="Add a comment..."
              style={{
                lineHeight: 1.5,
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons - Only show when input is focused */}
      {isFocused && (
        <div className="flex justify-end gap-[25px] lg:gap-[40px]">
          <ButtonVideo icon="close" text="Cancel" onClick={handleCancel} />
          <ButtonVideo icon="send" text="Comment" onClick={handleSubmit} />
        </div>
      )}
      {showPrompt && (
        <div
          className="absolute top-full left-3 mt-2 z-50 px-[10px] py-[10px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit whitespace-nowrap rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
          style={{ wordSpacing: "5px" }}
        >
          Please{" "}
          <span Link className="text-blue-500">
            <Link to="/login">login</Link>
          </span>
          ! to Add Comment
        </div>
      )}
    </div>
  );
};

export default AddComment;
