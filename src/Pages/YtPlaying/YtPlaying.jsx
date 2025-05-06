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

const YtPlayingPage = () => {
  const [video, setVideo] = useState({});
  const [CommentResponse, setCommentResponse] = useState([]);
  const [CommentCount, setCommentCount] = useState(0);
  const { videoid } = useParams();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [hasFetchedComments, setHasFetchedComments] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(video.isSubscribed ? video.isSubscribed : false);

  const isUserLoggedin = useSelector(isLoggedin)

  useEffect(() => {
    const CommentApi = async () => {
      if (inView && !hasFetchedComments) {
        const response = await commentService.getVideoComments({
          videoId: videoid,
        });
        setCommentResponse(response.comments);
        setCommentCount(response.ommentCount);
        setHasFetchedComments(true);

        console.log("response structure of comment is", response);
      }
    };
    CommentApi();
  }, [inView, hasFetchedComments, videoid]);

  useEffect(() => {
    console.log("useffect run");
    async function fetchVideo() {
      const response = await videoService.getVideoDetails(videoid);
      console.log("resonse is", response);
      setVideo(response[0]);
    }
    fetchVideo();
  }, [videoid]);

  const handleSubscribing = async () => {
    // Optimistically update UI
    if(isUserLoggedin){
      setIsSubscribed(true);
    try {
      const response = await subscriptionService.subscribe(videoid);
      if (response && response.statusCode === 200 && response.message === "Subscribed successfully") {
        // Success - do nothing, UI already updated
      } else {
        // Rollback if something went wrong
        setIsSubscribed(false);
        alert("Subscription failed or unexpected response");
      }
    } catch (error) {
      setIsSubscribed(false); // Rollback
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong while subscribing.");
      }
    }
    }
  };

  // console.log("structure of videooo", video)
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
                subscribers={video.SubscribersCount}
                profileImage={video.Owner?.Avatar}
                isSubscribed={isSubscribed}
                handleSubscribing={handleSubscribing}
              />
              <div className="flex items-center justify-between sm:justify-normal sm:gap-[15px]  md:gap-[15px]">
                <LikeDislike
                  initialLikes={video.VideoLikesCount}
                  isLiked={video.isLiked ? video.isLiked : false}
                  isDisliked={video.isDisliked ? video.isDisliked : false}
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
