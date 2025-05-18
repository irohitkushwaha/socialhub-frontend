import React, { useState, useEffect } from "react";
import InstagramPostProfile from "../Post/Components/InstagramPostProfile";
import InstagramPostImage from "../Post/Components/InstagramPostImage";
import PostAction from "../Post/Components/PostAction";
import PostDetails from "../Post/Components/PostDetails";
import apnacollege from "../../../../assets/apna college.jpg";
import shradha from "../../../../assets/shradha.jpg";
import { likesService } from "../../../../Services/api/Likes.Service";
import {
  selectIsCommentOpen,
  selectActiveItemId,
  selectItemType,
} from "../../../../redux/slices/commentSlice";
import { useSelector } from "react-redux";
import CommentCompo from "../../../Common/CommentCompo";
import { commentService } from "../../../../Services/api/Comment.Service";

function InstagramPost({
  profileImage = shradha,
  username = "@shradhakhapra123",
  isVerified = true,
  timeAgo = "1w",
  InitialLikeCount = 1234,
  title = "Enjoying a beautiful day at the beach!, heelo everyone i am here to build a startup #summer #vacation #relaxation",
  InitialIsFollow = false,
  imageUrl = apnacollege,
  InitialIsLiked = false,
  InitialIsSaved = false,
  postId,
  userId,
}) {
  const [isLiked, setIsLiked] = useState(InitialIsLiked);
  const [likeCount, setLikeCount] = useState(InitialLikeCount);

  const isCommentOpen = useSelector(selectIsCommentOpen);
  const activeItemId = useSelector(selectActiveItemId);
  const itemType = useSelector(selectItemType);

  const [CommentResponse, setCommentResponse] = useState([]);
  const [CommentCount, setCommentCount] = useState(0);

  const fetchComment = async () => {
    try {
      console.log("post id is", postId);
      const response = await commentService.getPostComments({
        postId: postId,
      });
      console.log("response for post comment is", response);
      setCommentResponse(response.comments);
      setCommentCount(response.commentCount);
    } catch (error) {
      console.log("error in api calling for comment for reels", error.msg);
    }
  };

  const isActivePost =
    isCommentOpen && activeItemId === postId && itemType === "post";

  useEffect(() => {
    if (isActivePost) {
      fetchComment();
    }
  }, [isCommentOpen]);

  useEffect(() => {
    setLikeCount(InitialLikeCount);
    setIsLiked(InitialIsLiked);
  }, [InitialLikeCount, InitialIsLiked]);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount((prevCount) => prevCount - 1);
      const response = await likesService.deleteLikePost(postId);
      console.log("response for delete like post is ", response);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
      const response = await likesService.likePost(postId);
      console.log("response for like post is ", response);
    }
  };

  return (
    <div className="relative w-full md:max-w-[500px] mx-auto overflow-x-hidden px-[7px] py-[5px]">
      <div className="w-full flex flex-col gap-[20px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] justify-start px-[3px] pt-[10px] pb-[16px] items-center">
        <div className="w-full px-[5px]">
          <InstagramPostProfile
            profileImage={profileImage}
            username={username}
            isVerified={isVerified}
            timeAgo={timeAgo}
            InitialIsFollow={InitialIsFollow}
            postId={postId}
            userId={userId}
          />
        </div>
        <InstagramPostImage imageUrl={imageUrl} />
        <div className="w-full px-[10px]">
          <PostAction
            InitialIsLiked={isLiked}
            InitialIsSaved={InitialIsSaved}
            handleLike={handleLike}
            postId={postId}
          />
        </div>
        <div className="w-full px-[10px]">
          <PostDetails likeCount={likeCount} title={title} />
        </div>
      </div>
      {isActivePost && (
        <div className="absolute z-50 top-[150px] bg-opacity-50 pl-[10px] pr-[10px] w-full md:h-[500px] h-[400px]">
          <div className="w-full h-full">
            <CommentCompo
              isReel={true}
              CommentCount={CommentCount}
              CommentResponse={CommentResponse}
              postId={postId}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InstagramPost;
