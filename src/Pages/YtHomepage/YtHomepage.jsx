import React, { useState, useEffect } from "react";
import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard";
import { Link } from "react-router-dom";
import { videoService } from "./../../Services/api/Video.Service";
import ThumbnailImg from "../../assets/thumbnail1.webp";
import Avatar from "../../assets/shradha.jpg";
import { formatDuration } from "../../utils/formatDuration.js";
import { formatCompactNumber } from "../../utils/formatCompactNumber.js";
import { formatTimeAgo } from "../../utils/formatTimeAgo.js";

// import axios from "axios";

const YtHomepage = () => {
  // Get layout context - we can access things passed from the layout this way

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const ThumbnailOfVideos = await videoService.getVideosList();

        console.log("Thumbnail of videos", ThumbnailOfVideos);
        setVideos(ThumbnailOfVideos.VideosList);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch videos");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Format views using Intl.NumberFormat with compact notation
  const formatViews = (views) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(views);
  };

  if (loading) return <div className="p-6">Loading videos...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="px-[10px]">
      <div className="flex flex-wrap gap-[20px] justify-center">
        {videos.map(
          (video) => (
            console.log("icon is", video.Owner.Avatar),
            (
              <Link to={`/youtube/playing/${video._id}`} key={video._id}>
                <ThumbnailCard
                  thumbnailSrc={video.Thumbnail}
                  title={video.Title}
                  channelIcon={video.Owner.Avatar}
                  channelName={video.Owner.FullName}
                  views={`${formatCompactNumber(video.views)}`}
                  uploadTime={formatTimeAgo(video.createdAt)} // This would need to be calculated from the video data
                  duration={`${formatDuration(video.Duration)}`}
                />
              </Link>
            )
          )
        )}
      </div>
    </div>
  );
};

export default YtHomepage;
