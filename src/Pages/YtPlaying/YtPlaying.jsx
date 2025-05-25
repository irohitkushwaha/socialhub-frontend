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
import { watchHistoryService } from "../../Services/api/WatchHistory.Service";
import { useRef } from "react";
import { selectIsShareModalOpen } from "../../redux/slices/shareSlice";
import { openShareModal } from "../../redux/slices/shareSlice";
import { useDispatch } from "react-redux";
import ShareModal from "../../components/Common/ShareModal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "react-router-dom";

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
  const [watchHistorySaved, setWatchHistorySaved] = useState(false);
  const watchHistoryTimeout = useRef(null);

  const isShareModalOpen = useSelector(selectIsShareModalOpen);

  const dispatch = useDispatch();

  const [showPrompt, setShowPrompt] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  // Now add this useEffect right after your fetchVideo useEffect
  useEffect(() => {
    // Only run if video is loaded, user is logged in, and watch history hasn't been saved yet
    if (video && video._id && isUserLoggedin && !watchHistorySaved) {
      console.log("Starting 5-second timer for watch history...");

      // Clear any previous timeout
      if (watchHistoryTimeout.current) {
        clearTimeout(watchHistoryTimeout.current);
      }

      // Set new timeout for 5 seconds
      watchHistoryTimeout.current = setTimeout(async () => {
        console.log("Saving watch history for video:", videoid);

        try {
          const response = await watchHistoryService.saveToWatchHistory(
            videoid
          );
          console.log("Watch history saved successfully:", response);
          setWatchHistorySaved(true);
        } catch (error) {
          console.error("Error saving watch history:", error);
        }
      }, 4000); // 5 seconds

      // Cleanup function
      return () => {
        if (watchHistoryTimeout.current) {
          clearTimeout(watchHistoryTimeout.current);
          watchHistoryTimeout.current = null;
        }
      };
    }
  }, [video, videoid, isUserLoggedin, watchHistorySaved]);

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

  console.log("initial likes", initialLikes);

  useEffect(() => {
    setIsSubscribed(!!video.isSubscribed);
  }, [video.isSubscribed]);

  useEffect(() => {
    console.log("value of issubscribed (updated):", isSubscribed);
  }, [isSubscribed]);

  const handleVideoDownload = async () => {
    try {
      if (!video || !video.VideoFile) {
        throw new Error("Video file is not available for download");
      }

      // Get sanitized filename from video title
      const sanitizedTitle = (video.Title || "video")
        .replace(/[^\w\s-]/g, "") // Remove special chars
        .trim()
        .replace(/\s+/g, "-"); // Replace spaces with HYPEN

      const fileName = `${sanitizedTitle}.mp4`;
      const videoUrl = video.VideoFile.replace("http:", "https:");

      // Show loading indicator (optional)
      // setDownloading(true);

      // Use fetch to get the file as a blob
      const response = await fetch(videoUrl);

      if (!response.ok) {
        throw new Error("Failed to download video");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);
        // setDownloading(false);
      }, 100);

      console.log(`Download initiated for: ${fileName}`);
    } catch (error) {
      console.error("Download failed:", error.message);
      // setDownloading(false);
      alert("Sorry, we couldn't download this video. Please try again later.");
    }
  };

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}/youtube/playing/${video._id}`;
    dispatch(
      openShareModal({
        url: shareUrl,
        title: `${video.Title}`,
      })
    );
  };

  console.log("structure of videooo", video);
  return (
    <div className="w-full lg:px-[15%] md:px-[15px] py-[10px] px-[10px]">
      <div className="flex gap-[15px] lg:gap-[22px] flex-col">
        <VideoPlayer url={video.VideoFile?.replace("http:", "https:")} />
        <div className="relative flex flex-col gap-[25px] w-full">
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
                channelUserid={video.Owner?._id}
                setParentShowPrompt={setShowPrompt}
              />
              <div className="flex items-center justify-between sm:justify-normal sm:gap-[15px]  md:gap-[15px]">
                <LikeDislike
                  initialLikes={initialLikes}
                  isLiked={isLiked}
                  isDisliked={isDisliked}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                />
                <div onClick={handleShareClick}>
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
                </div>
                <div onClick={handleVideoDownload} className="cursor-pointer">
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
          {showPrompt && isMobile && (
            <div
              className="block absolute md:hidden top-0 left-1 z-50 px-[10px] py-[10px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit whitespace-nowrap rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
              style={{ wordSpacing: "5px" }}
            >
              Please{" "}
              <span Link className="text-blue-500">
                <Link to="/login">login</Link>
              </span>
              ! to Subscribe
            </div>
          )}
          {isShareModalOpen && (
            <div className="absolute z-50 top-[0px] left-[2px] md:right-[250px] bg-opacity-50 flex items-center justify-center md:p-4">
              <div className="max-w-md w-full">
                <ShareModal />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YtPlayingPage;
