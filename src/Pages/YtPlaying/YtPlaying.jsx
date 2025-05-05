import VideoPlayer from "../../components/Youtube/Components/VideoPlayer";
import Title from "../../components/Youtube/Components/Title";
import ChannelVideoData from "../../components/Youtube/Components/ChannelVideoData";
import LikeDislike from "../../components/Youtube/Components/LikeDislike";
import Button from "../../components/ui/Button";
import Description from "../../components/Youtube/Components/Description";
import CommentCompo from "../../components/Common/CommentCompo";
import SuggestedThumbnail from "../../components/Youtube/Components/SuggestedThumbnail";
import { videoService } from "../../Services/api/Video.Service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const YtPlayingPage = () => {
  const [video, setVideo] = useState({});
  const { videoid } = useParams();
  useEffect(() => {
    console.log("useffect run")
    async function fetchVideo() {
      const response = await videoService.getVideoDetails(videoid);
      console.log("resonse is", response)
      setVideo(response[0]);
    }
    fetchVideo();
  }, [videoid]);
  return (
    <div className="w-full lg:px-[15%] md:px-[15px] py-[10px] px-[10px]">
      <div className="flex gap-[15px] lg:gap-[22px] flex-col">
        <VideoPlayer url={video.VideoFile} />
        <div className="flex flex-col gap-[25px] w-full">
          <Title>{video.Title}</Title>
          <div className="flex flex-col w-full gap-[35px] ">
            <div className="flex flex-col  gap-[27px] sm:gap-[27px]  media-custom  w-full ">
              <ChannelVideoData channelName={video.Owner?.FullName} subscribers={video.SubscribersCount} profileImage={video.Owner?.Avatar} isSubscribed={video.isSubscribed ? video.isSubscribed : false}/>
              <div className="flex items-center justify-between sm:justify-normal sm:gap-[15px]  md:gap-[15px]">
                <LikeDislike initialLikes={video.VideoLikesCount} isLiked={video.isLiked ? video.isLiked : false} isDisliked={video.isDisliked ? video.isDisliked : false}/>
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
            <Description description={video.Description} views={video.views} />
            <CommentCompo />
            <SuggestedThumbnail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YtPlayingPage;
