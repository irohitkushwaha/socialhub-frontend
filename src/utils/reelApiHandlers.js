// In a new file: src/utils/reelHandlers.js

import { likesService } from "../Services/api/Likes.Service";
import { subscriptionService } from "../Services/api/Subscription.Service";
import { savedService } from "../Services/api/Saved.Service";

// Like/Unlike video handler
export const handleReelLike = async (videoId, isLiked, setIsLiked, updateLikeCount) => {
  try {
    if (!isLiked) {
      // Optimistic UI update
      setIsLiked(true);
      updateLikeCount(prev => prev + 1);
      
      // API call
      const response = await likesService.likeVideo(videoId);
      console.log("response of like api call is", response);
    } else {
      // Optimistic UI update
      setIsLiked(false);
      updateLikeCount(prev => prev - 1);
      
      // API call
      const response = await likesService.deleteLikeVideo(videoId);
      console.log("response of unlike api call is", response);
    }
  } catch (error) {
    // Rollback on error
    setIsLiked(!isLiked);
    updateLikeCount(prev => isLiked ? prev + 1 : prev - 1);
    console.error("Like action failed:", error);
  }
};

// Save/Unsave video handler
export const handleReelSave = async (videoId, isSaved, setIsSaved) => {
  try {
    if (!isSaved) {
      // Optimistic UI update
      setIsSaved(true);
      
      // API call
      const response = await savedService.saveReel(videoId);
      console.log("response of save api call is", response);
    } else {
      // Optimistic UI update
      setIsSaved(false);
      
      // API call
      const response = await savedService.deleteSavedReel(videoId);
      console.log("response of delete save api call is", response);
    }
  } catch (error) {
    // Rollback on error
    setIsSaved(!isSaved);
    console.error("Save action failed:", error);
  }
};

// Follow/Unfollow handler
export const handleFollow = async (userId, isFollowing, setIsFollowing) => {
  try {
    if (!isFollowing) {
      // Optimistic UI update
      setIsFollowing(true);
      
      // API call
      await subscriptionService.subscribe(userId);
    } else {
      // Optimistic UI update
      setIsFollowing(false);
      
      // API call
      await subscriptionService.unsubscribe(userId);
    }
  } catch (error) {
    // Rollback on error
    setIsFollowing(!isFollowing);
    console.error("Follow action failed:", error);
  }
};

//Comment will be done later, as of now ignore it
// // Comment operations
// export const handleAddComment = async (videoId, commentText, updateComments) => {
//   try {
//     const response = await commentService.addComment(videoId, commentText);
    
//     // Update comments list with new comment
//     updateComments(prev => [response.comment, ...prev]);
//     return response.comment;
//   } catch (error) {
//     console.error("Add comment failed:", error);
//     return null;
//   }
// };

// export const handleLikeComment = async (commentId, isLiked, updateComments) => {
//   try {
//     if (!isLiked) {
//       await commentService.likeComment(commentId);
//     } else {
//       await commentService.unlikeComment(commentId);
//     }
    
//     // Update the comments list to reflect the like status change
//     updateComments(prev => 
//       prev.map(comment => 
//         comment._id === commentId 
//           ? {...comment, isLiked: !isLiked, likesCount: isLiked ? comment.likesCount - 1 : comment.likesCount + 1} 
//           : comment
//       )
//     );
//   } catch (error) {
//     console.error("Comment like action failed:", error);
//   }
// };

// export const handleDeleteComment = async (commentId, updateComments) => {
//   try {
//     await commentService.deleteComment(commentId);
    
//     // Remove the comment from the list
//     updateComments(prev => prev.filter(comment => comment._id !== commentId));
//   } catch (error) {
//     console.error("Delete comment failed:", error);
//   }
// };