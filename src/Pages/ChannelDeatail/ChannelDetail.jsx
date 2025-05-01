import CoverImage from "../../components/Common/CoverImage";
import coverimage from "../../assets/coverimage.jpg";
import ProfileImage from "../../components/Common/ProfileImage";
import Shradha from "../../assets/shradha.jpg";
import SubscriberDetail from "../../components/Youtube/Components/SubscriberDetail";
import SubscribeBtn from "../../components/Youtube/Components/SubscribeBtn";
import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard";
import { useState, useEffect } from "react";
import ThumbnailImg from "../../assets/thumbnail1.webp";
import Avatar from "../../assets/shradha.jpg";
import { Link } from "react-router-dom";

import React from "react";

function ChannelDetail() {
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
        setVideos(sampleVideos);
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
    <div className="w-full py-[30px] px-[10px] lg:px-[25px] gap-[40px] flex flex-col">
      <CoverImage image={coverimage} />
      <div className="w-full md:w-fit md:mx-auto flex flex-col md:flex-row items-center justify-center md:justify-normal px-[15px] md:px-[40px] py-[15px] md:py-[30px] gap-[50px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]">
        <div className="flex items-center justify-center gap-[20px]">
          <ProfileImage
            profileImage={Shradha}
            isOnline={false}
            mainDivClassName="w-fit"
          />
          <SubscriberDetail />
        </div>
        <div className="w-full md:w-fit px-[20px]">
          <SubscribeBtn isSubscribed width="w-full md:w-[270px]" />
        </div>
      </div>
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
}

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

export default ChannelDetail;
