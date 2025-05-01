import React from "react";

const CommentCount = ({ count = 0, label = "Comments", className = "" }) => {
  return (
    <div>
      <h2
        className={`text-[18px] md:text-[20px] font-semibold text-[#414651] leading-[31px] tracking-[0.03em] ${className}`}
      >
        {count} {label}
      </h2>
    </div>
  );
};

export default CommentCount;
