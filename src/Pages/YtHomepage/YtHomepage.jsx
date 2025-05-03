import React, { useState, useEffect } from "react";
import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard";
import { Link } from "react-router-dom";
import {videoService} from "./../../Services/api/Video.Service"
import ThumbnailImg from "../../assets/thumbnail1.webp";
import Avatar from "../../assets/shradha.jpg";

// import axios from "axios";

const YtHomepage = () => {
  // Get layout context - we can access things passed from the layout this way

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // In a real implementation, this would be an actual API call
        // const response = await axios.get('/api/v1/video/videos-list?page=1&limit=12');
        // setVideos(response.data.data);

        // Using sample data for demonstration
        const ThumbnailOfVideos = await videoService.getVideosList()

        console.log("Thumbnail of videos", ThumbnailOfVideos)
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
        {videos.map((video) => (
          <Link to="/youtube/playing">
            <ThumbnailCard
              key={video._id}
              thumbnailSrc={video.Thumbnail}
              title={video.Title}
              channelIcon={video.Owner.Avatar}
              channelName={video.Owner.FullName}
              views={`${formatViews(video.views)}`}
              uploadTime="3 days ago" // This would need to be calculated from the video data
              duration={video.Duration}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};






// Sample data structure matching what would come from the backend
const sampleVideos = [
  {
    _id: "video1",
    Thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    Title: "How to Build a Full Stack MERN Application",
    Owner: {
      _id: "user1",
      FullName: "Dev Tutorials",
      Avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 125000,
    Duration: "15:20",
    isShorts: false,
  },
  {
    _id: "video2",
    Thumbnail: ThumbnailImg,
    Title: "Learn Python in 2 Hours | Complete Beginner Tutorial",
    Owner: {
      _id: "user2",
      FullName: "Python Master",
      Avatar: Avatar,
    },
    views: 980000,
    Duration: "1:45:10",
    isShorts: false,
  },
  {
    _id: "video3",
    Thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    Title: "React JS Crash Course 2023",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 452000,
    Duration: "42:15",
    isShorts: false,
  },
  {
    _id: "video4",
    Thumbnail: "https://i.ytimg.com/vi/pQN-pnXPaVg/maxresdefault.jpg",
    Title: "HTML CSS Tutorial for Beginners",
    Owner: {
      _id: "user4",
      FullName: "Web Dev Simplified",
      Avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    views: 1200000,
    Duration: "58:30",
    isShorts: false,
  },
  {
    _id: "video5",
    Thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
    Title: "MongoDB Atlas Tutorial - Cloud Database Setup",
    Owner: {
      _id: "user5",
      FullName: "Database Expert",
      Avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    views: 78500,
    Duration: "12:45",
    isShorts: false,
  },
  {
    _id: "video6",
    Thumbnail: "https://i.ytimg.com/vi/gV_2lyK8LRE/maxresdefault.jpg",
    Title: "Node.js Express API | Complete Guide",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 320000,
    Duration: "32:10",
    isShorts: false,
  },
  {
    _id: "video1",
    Thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    Title: "How to Build a Full Stack MERN Application",
    Owner: {
      _id: "user1",
      FullName: "Dev Tutorials",
      Avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 125000,
    Duration: "15:20",
    isShorts: false,
  },
  {
    _id: "video2",
    Thumbnail: ThumbnailImg,
    Title: "Learn Python in 2 Hours | Complete Beginner Tutorial",
    Owner: {
      _id: "user2",
      FullName: "Python Master",
      Avatar: Avatar,
    },
    views: 980000,
    Duration: "1:45:10",
    isShorts: false,
  },
  {
    _id: "video3",
    Thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    Title: "React JS Crash Course 2023",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 452000,
    Duration: "42:15",
    isShorts: false,
  },
  {
    _id: "video4",
    Thumbnail: "https://i.ytimg.com/vi/pQN-pnXPaVg/maxresdefault.jpg",
    Title: "HTML CSS Tutorial for Beginners",
    Owner: {
      _id: "user4",
      FullName: "Web Dev Simplified",
      Avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    views: 1200000,
    Duration: "58:30",
    isShorts: false,
  },
  {
    _id: "video5",
    Thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
    Title: "MongoDB Atlas Tutorial - Cloud Database Setup",
    Owner: {
      _id: "user5",
      FullName: "Database Expert",
      Avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    views: 78500,
    Duration: "12:45",
    isShorts: false,
  },
  {
    _id: "video6",
    Thumbnail: "https://i.ytimg.com/vi/gV_2lyK8LRE/maxresdefault.jpg",
    Title: "Node.js Express API | Complete Guide",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 320000,
    Duration: "32:10",
    isShorts: false,
  },
  {
    _id: "video1",
    Thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    Title: "How to Build a Full Stack MERN Application",
    Owner: {
      _id: "user1",
      FullName: "Dev Tutorials",
      Avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 125000,
    Duration: "15:20",
    isShorts: false,
  },
  {
    _id: "video2",
    Thumbnail: ThumbnailImg,
    Title: "Learn Python in 2 Hours | Complete Beginner Tutorial",
    Owner: {
      _id: "user2",
      FullName: "Python Master",
      Avatar: Avatar,
    },
    views: 980000,
    Duration: "1:45:10",
    isShorts: false,
  },
  {
    _id: "video3",
    Thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    Title: "React JS Crash Course 2023",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 452000,
    Duration: "42:15",
    isShorts: false,
  },
  {
    _id: "video4",
    Thumbnail: "https://i.ytimg.com/vi/pQN-pnXPaVg/maxresdefault.jpg",
    Title: "HTML CSS Tutorial for Beginners",
    Owner: {
      _id: "user4",
      FullName: "Web Dev Simplified",
      Avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    views: 1200000,
    Duration: "58:30",
    isShorts: false,
  },
  {
    _id: "video5",
    Thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
    Title: "MongoDB Atlas Tutorial - Cloud Database Setup",
    Owner: {
      _id: "user5",
      FullName: "Database Expert",
      Avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    views: 78500,
    Duration: "12:45",
    isShorts: false,
  },
  {
    _id: "video6",
    Thumbnail: "https://i.ytimg.com/vi/gV_2lyK8LRE/maxresdefault.jpg",
    Title: "Node.js Express API | Complete Guide",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 320000,
    Duration: "32:10",
    isShorts: false,
  },
  {
    _id: "video1",
    Thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    Title: "How to Build a Full Stack MERN Application",
    Owner: {
      _id: "user1",
      FullName: "Dev Tutorials",
      Avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 125000,
    Duration: "15:20",
    isShorts: false,
  },
  {
    _id: "video2",
    Thumbnail: ThumbnailImg,
    Title: "Learn Python in 2 Hours | Complete Beginner Tutorial",
    Owner: {
      _id: "user2",
      FullName: "Python Master",
      Avatar: Avatar,
    },
    views: 980000,
    Duration: "1:45:10",
    isShorts: false,
  },
  {
    _id: "video3",
    Thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    Title: "React JS Crash Course 2023",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 452000,
    Duration: "42:15",
    isShorts: false,
  },
  {
    _id: "video4",
    Thumbnail: "https://i.ytimg.com/vi/pQN-pnXPaVg/maxresdefault.jpg",
    Title: "HTML CSS Tutorial for Beginners",
    Owner: {
      _id: "user4",
      FullName: "Web Dev Simplified",
      Avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    views: 1200000,
    Duration: "58:30",
    isShorts: false,
  },
  {
    _id: "video5",
    Thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
    Title: "MongoDB Atlas Tutorial - Cloud Database Setup",
    Owner: {
      _id: "user5",
      FullName: "Database Expert",
      Avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    views: 78500,
    Duration: "12:45",
    isShorts: false,
  },
  {
    _id: "video6",
    Thumbnail: "https://i.ytimg.com/vi/gV_2lyK8LRE/maxresdefault.jpg",
    Title: "Node.js Express API | Complete Guide",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 320000,
    Duration: "32:10",
    isShorts: false,
  },
  {
    _id: "video6",
    Thumbnail: "https://i.ytimg.com/vi/gV_2lyK8LRE/maxresdefault.jpg",
    Title: "Node.js Express API | Complete Guide",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 320000,
    Duration: "32:10",
    isShorts: false,
  },
  {
    _id: "video6",
    Thumbnail: "https://i.ytimg.com/vi/gV_2lyK8LRE/maxresdefault.jpg",
    Title: "Node.js Express API | Complete Guide",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 320000,
    Duration: "32:10",
    isShorts: false,
  },
  {
    _id: "video6",
    Thumbnail: "https://i.ytimg.com/vi/gV_2lyK8LRE/maxresdefault.jpg",
    Title: "Node.js Express API | Complete Guide",
    Owner: {
      _id: "user3",
      FullName: "JavaScript Pro",
      Avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    views: 320000,
    Duration: "32:10",
    isShorts: false,
  },
];

export default YtHomepage;
