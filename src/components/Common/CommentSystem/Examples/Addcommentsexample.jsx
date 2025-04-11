import React from "react";
import AddComment from "../Addcomment";

const AddCommentExample = () => {
  const handleCommentSubmit = (text) => {
    console.log("Comment submitted:", text);
    // Here you would typically send the comment to your backend
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="">
        <AddComment
          profilePic="src/assets/shradha.jpg"
          onSubmit={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default AddCommentExample;
