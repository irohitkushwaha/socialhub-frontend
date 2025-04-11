import React from "react";
import CommentList from "../CommentList";
import CommentCount from "../CommentCount";

const CommentListExample = () => {
  // Sample data for demonstration
  const comments = [
    {
      id: 1,
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Rohit Kushwaha",
      timeAgo: "10 Minutes ago",
      text: "This lecture on the String Compression problem is incredibly clear and insightful!",
      likeCount: 5,
      initialLiked: false,
      initialDisliked: false,
    },
    {
      id: 2,
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Ananya Singh",
      timeAgo: "2 Hours ago",
      text: "The explanation of time complexity analysis really helped me understand the problem better. I especially liked how the instructor broke down each step.",
      likeCount: 12,
      initialLiked: true,
      initialDisliked: false,
    },
    {
      id: 3,
      profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
      name: "Vikram Patel",
      timeAgo: "1 Day ago",
      text: "As someone new to programming, this was very approachable. Thank you for the detailed walkthrough!",
      likeCount: 8,
      initialLiked: false,
      initialDisliked: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mt-6">
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default CommentListExample;
