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

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    setCommentText("");
    setIsFocused(false);
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (commentText.trim() && onSubmit) {
      onSubmit(commentText);
      setCommentText("");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-[30px] w-full">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={profilePic}
            alt="Profile"
            className="w-[63px] h-[63px] rounded-full object-cover"
          />
        </div>

        {/* Comment Input Area */}
        <div className="flex-grow">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={commentText}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Add a comment..."
              className="w-full resize-none overflow-hidden border-b-[3px] border-[#E6E6E6] focus:outline-none text-[18px] md:text-[20px] font-semibold text-[#686C73] bg-transparent "
              style={{
                lineHeight: 1.5,
                height: "2px",
              }}
            />
          </div>

          {/* Action Buttons - Only show when input is focused */}
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
