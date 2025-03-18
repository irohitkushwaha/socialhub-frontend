import React, { useState, useRef, useEffect } from "react";
import ButtonVideo from "./btnvideo";

const AddComment = ({
  profilePic = "https://via.placeholder.com/63",
  onCancel,
  onSubmit,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

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
    if (textareaRef.current && textareaRef.current.textContent !== commentText) {
      textareaRef.current.textContent = commentText;
    }
  }, [commentText]);

  const handleChange = (e) => {
    // This is now handled by the onInput prop
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    setCommentText("");
    if (textareaRef.current) {
      textareaRef.current.textContent = "";
    }
    setIsFocused(false);
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (commentText.trim() && onSubmit) {
      onSubmit(commentText);
      setCommentText("");
      if (textareaRef.current) {
        textareaRef.current.textContent = "";
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-[30px] w-full">
        {/* Profile Picture */}
        <div className="flex-shrink-0 self-start mt-[10px]">
          <img
            src={profilePic}
            alt="Profile"
            className="w-[63px] h-[63px] rounded-full object-cover"
          />
        </div>

        {/* Comment Input Area */}
        <div className="flex w-full">
          <div className="w-full">
            <div
              ref={textareaRef}
              contentEditable
              onInput={(e) => setCommentText(e.currentTarget.textContent || "")}
              onFocus={handleFocus}
              className="py-[15px] w-full text-start border-b-[3px] border-[#E6E6E6] focus:outline-none text-[18px] md:text-[20px] font-semibold text-[#686C73] bg-transparent min-h-[30px] overflow-hidden empty:before:content-[attr(data-placeholder)] empty:before:text-[#686C73] empty:before:opacity-70"
              data-placeholder="Add a comment..."
              style={{
                lineHeight: 1.5,
                wordWrap: "break-word",
                whiteSpace: "pre-wrap"
              }}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons - Only show when input is focused */}
      {isFocused && (
        <div className="flex justify-end gap-4 mt-4">
          <ButtonVideo icon="close" text="Cancel" onClick={handleCancel} />
          <ButtonVideo icon="send" text="Comment" onClick={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default AddComment;
