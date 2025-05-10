import VideoPlayer from "../../components/Youtube/Components/VideoPlayer";
import Title from "../../components/Youtube/Components/Title";
import ChannelVideoData from "../../components/Youtube/Components/ChannelVideoData";
import LikeDislike from "../../components/Youtube/Components/LikeDislike";
import Button from "../../components/ui/Button";
import Description from "../../components/Youtube/Components/Description";
import CommentCompo from "../../components/Common/CommentCompo";
import SuggestedThumbnail from "../../components/Youtube/Components/SuggestedThumbnail";
import { videoService } from "../../Services/api/Video.Service";
import { commentService } from "../../Services/api/Comment.Service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { useInView } from "react-intersection-observer";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { isLoggedin } from "../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
import { subscriptionService } from "../../Services/api/Subscription.Service";
import { likesService } from "../../Services/api/Likes.Service";
import { dislikesService } from "../../Services/api/Dislikes.Service";

const YtPlayingPage = () => {
  const [video, setVideo] = useState({});
  const [CommentResponse, setCommentResponse] = useState([]);
  const [CommentCount, setCommentCount] = useState(0);
  const { videoid } = useParams();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [hasFetchedComments, setHasFetchedComments] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isUserLoggedin = useSelector(isLoggedin);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [initialLikes, setInitialLikes] = useState(0);
  const [subscribersCount, setSubscribersCount] = useState(
    video.SubscribersCount
  );

  const CommentApi = async () => {
    if (inView && !hasFetchedComments) {
      const response = await commentService.getVideoComments({
        videoId: videoid,
      });
      setCommentResponse(response.comments);
      setCommentCount(response.commentCount);
      setHasFetchedComments(true);

      console.log("response structure of comment is", response);
    }
  };

  useEffect(() => {
    CommentApi();
  }, [inView, hasFetchedComments, videoid]);

  const fetchVideo = async () => {
    const response = await videoService.getVideoDetails(videoid);
    setVideo(response[0]);
  };

  useEffect(() => {
    fetchVideo();
  }, [videoid]);

  const handleSubscribing = async () => {
    if (!isUserLoggedin) return;
    setIsSubscribed(true);
    setSubscribersCount((prev) => prev + 1);
    try {
      const response = await subscriptionService.subscribe(videoid);
      console.log("response of subscribe is", response);
      // UI is already updated, no further action needed
    } catch (error) {
      setIsSubscribed(false); // Rollback on error
      // alert("Subscription failed.");
      console.log("error of api for subscribe", error);
    }
  };

  const handleUnsubscribing = async () => {
    if (!isUserLoggedin) return;
    setIsSubscribed(false); // Optimistic UI update
    setSubscribersCount((prev) => prev - 1);
    try {
      const response = await subscriptionService.unsubscribe(videoid);

      console.log("response of unsubscribe api call is", response);
      // Optionally refetch video details here if you want to sync state
    } catch (error) {
      setIsSubscribed(true); // Rollback on error
      console.log("unsubscription failed due to error", error);
    }
  };

  const handleLike = async () => {
    if (!isLiked) {
      const likeVideo = await likesService.likeVideo(videoid);
      console.log("like video api call is", likeVideo);
      if (isDisliked) {
        const deleteDislikeWhenLike = await dislikesService.deleteDislikeVideo(
          videoid
        );
        console.log("disliked when liked called", deleteDislikeWhenLike);
      }
      setIsLiked(true);
      setIsDisliked(false);
    } else {
      await likesService.deleteLikeVideo(videoid);
      setIsLiked(false);
    }
  };

  const handleDislike = async () => {
    if (!isDisliked) {
      const dislikevideo = await dislikesService.dislikeVideo(videoid);
      console.log("response of dilsike video is", dislikevideo);
      if (isLiked) {
        const deleteLikewhenDislike = await likesService.deleteLikeVideo(
          videoid
        );
        console.log("unliked when disliked called", deleteLikewhenDislike);
      }
      setIsDisliked(true);
      setIsLiked(false);
    } else {
      await dislikesService.deleteDislikeVideo(videoid);
      setIsDisliked(false);
    }
  };
  useEffect(() => {
    setIsLiked(!!video.isLiked);
    setIsDisliked(!!video.isDisliked);
    setInitialLikes(video.VideoLikesCount);
    setSubscribersCount(video.SubscribersCount);
  }, [
    video.isLiked,
    video.isDisliked,
    video.VideoLikesCount,
    video.SubscribersCount,
  ]);

  useEffect(() => {
    setCommentResponse();
  }, []);

  console.log("initial likes", initialLikes);

  useEffect(() => {
    setIsSubscribed(!!video.isSubscribed);
  }, [video.isSubscribed]);

  useEffect(() => {
    console.log("value of issubscribed (updated):", isSubscribed);
  }, [isSubscribed]);

  console.log("structure of videooo", video);
  return (
    <div className="w-full lg:px-[15%] md:px-[15px] py-[10px] px-[10px]">
      <div className="flex gap-[15px] lg:gap-[22px] flex-col">
        <VideoPlayer url={video.VideoFile} />
        <div className="flex flex-col gap-[25px] w-full">
          <Title>{video.Title}</Title>
          <div className="flex flex-col w-full gap-[35px] ">
            <div className="flex flex-col  gap-[27px] sm:gap-[27px]  media-custom  w-full ">
              <ChannelVideoData
                channelName={video.Owner?.FullName}
                subscribers={subscribersCount}
                profileImage={video.Owner?.Avatar}
                isSubscribed={isSubscribed}
                handleSubscribing={handleSubscribing}
                handleUnsubscribing={handleUnsubscribing}
              />
              <div className="flex items-center justify-between sm:justify-normal sm:gap-[15px]  md:gap-[15px]">
                <LikeDislike
                  initialLikes={initialLikes}
                  isLiked={isLiked}
                  isDisliked={isDisliked}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                />
                <Button
                  text="Share"
                  gap="gap-[5px] lg:gap-[10px]"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#00c950"
                      className="w-[23px] h-[23px] lg:w-[30px] lg:h-[30px]"
                    >
                      <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
                    </svg>
                  }
                />
                <Button
                  text="Download"
                  gap="gap-[5px] lg:gap-[10px]"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 24 24"
                      viewBox="0 0 24 24"
                      fill="#00c950"
                      className="w-[23px] h-[23px] lg:w-[30px] lg:h-[30px]"
                    >
                      {/* <g>
                        <rect fill="none" height="24" width="24" />
                      </g> */}
                      <g>
                        <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z" />
                      </g>
                    </svg>
                  }
                />
              </div>
            </div>
            <Description
              description={video.Description}
              views={video.views}
              publishedDate={formatTimeAgo(video.createdAt)}
            />
            <div ref={ref}>
              <CommentCompo
                CommentResponse={CommentResponse}
                CommentCount={CommentCount}
                videoid={videoid}
              />
            </div>
            {/* <SuggestedThumbnail /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YtPlayingPage;
