import React, { useState, useEffect } from "react";
import WatchHistoryVideo from "../../components/Youtube/Components/WatchHistory/watchhistoryvideo";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard/ThumbnailCard";
import { useSelector } from "react-redux";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { formatDuration } from "../../utils/formatDuration";
import { formatCompactNumber } from "../../utils/formatCompactNumber";
import { isLoggedin } from "../../redux/slices/authentication.slice";
import { Link } from "react-router-dom";
import { likesService } from "../../Services/api/Likes.Service";
const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isUserLoggedIn = useSelector(isLoggedin);

  useEffect(() => {
    if (isUserLoggedIn) {
      async function getLikedVideos() {
        try {
          const response = await likesService.getLikedVideos();
          console.log("response of Likedvideo is", response);
          setLikedVideos(response);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching watch history:", error);
          setLoading(false);
        }
      }
      getLikedVideos();
    }
  }, [isUserLoggedIn]);

  return (
    <div className="mx-auto w-full overflow-x-hidden">
      {!isUserLoggedIn ? (
        <div
          className="px-[15px] py-[20px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit mx-auto mt-[100px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
          style={{ wordSpacing: "5px" }}
        >
          Please{" "}
          <span className="text-blue-500">
            <Link to="/login">login</Link>
          </span>
          ! to see Liked Videos
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : likedVideos.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No liked videos
            </h2>
            <p className="text-gray-500 mt-2">
              You have not liked any videos yet. Start exploring!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[50px] w-full">
          {Array.isArray(likedVideos) &&
            likedVideos.map((video) => (
              <div
                key={video._id}
                className="w-full md:w-[1000px] mx-auto flex justify-center px-[10px]"
              >
                {isMobile ? (
                  <Link to={`/youtube/playing/${video._id}`} key={video._id}>
                    <ThumbnailCard
                      thumbnailSrc={video.Thumbnail}
                      title={video.Title}
                      channelIcon={video.Owner?.Avatar}
                      channelName={video.Owner?.FullName}
                      views={formatCompactNumber(video.views)}
                      uploadTime={formatTimeAgo(video.timestamp)}
                      duration={formatDuration(video.Duration)}
                    />
                  </Link>
                ) : (
                  <Link to={`/youtube/playing/${video._id}`} key={video._id}>
                    <WatchHistoryVideo
                      thumbnailSrc={video.Thumbnail}
                      title={video.Title}
                      channelIcon={video.Owner?.Avatar}
                      channelName={video.Owner?.FullName}
                      views={formatCompactNumber(video.views)}
                      uploadTime={formatTimeAgo(video.timestamp)}
                      duration={formatDuration(video.Duration)}
                    />
                  </Link>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LikedVideos;
