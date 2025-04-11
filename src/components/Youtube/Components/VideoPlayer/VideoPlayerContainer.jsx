import React from "react";
import VideoPlayer from "./components/VideoPlayer";
// Remove direct import of video file
import videoFile from "./assets/Megham Karukatha - Official Video Song _ Thiruchitrambalam _ Dhanush _ Anirudh _ Sun Pictures.mp4";

function VideoPlayerContainer() {
  // Use multiple video sources to test which ones work
  const mp4VideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // Public sample MP4
  const youtubeVideoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // YouTube video

  return (
    <div className="max-w-4xl mx-auto p-4">
      <VideoPlayer url={videoFile} />
    </div>
  );
}

export default VideoPlayerContainer;
