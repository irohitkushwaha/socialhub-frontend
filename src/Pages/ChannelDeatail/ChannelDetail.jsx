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
import { useParams } from "react-router-dom";
import { userService } from "../../Services/api/User.Service";
import { formatDuration } from "../../utils/formatDuration";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { formatCompactNumber } from "../../utils/formatCompactNumber";
import { subscriptionService } from "../../Services/api/Subscription.Service";
import { isLoggedin } from "../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
import { useMediaQuery } from "../../hooks/useMediaQuery";

import React from "react";

function ChannelDetail() {
  const { userid } = useParams();

  const [channelData, setChannelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(
    channelData.SubscribersCount
  );

  const isUserLoggedin = useSelector(isLoggedin);

  const [showPrompt, setShowPrompt] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setSubscribersCount(channelData.SubscribersCount);
  }, [channelData]);

  useEffect(() => {
      setIsSubscribed(!!channelData.IsSubscribed);
    }, [channelData.IsSubscribed]);

  useEffect(() => {
    const loadChannelData = async (userid) => {
      try {
        const response = await userService.getChannelDetail(userid);
        setChannelData(response);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch videos");
        setLoading(false);
      }
    };

    loadChannelData(userid);
  }, []);

  const handleSubscribing = async () => {
    if (!isUserLoggedin) return;
    setIsSubscribed(true);
    setSubscribersCount((prev) => prev + 1);
    try {
      const response = await subscriptionService.subscribeUser(userid);
      console.log("response of subscribe is", response);
      // UI is already updated, no further action needed
    } catch (error) {
      setIsSubscribed(false); // Rollback on error
      // alert("Subscription failed")
      console.log("error of api for subscribe", error);
    }
  };

  const handleUnsubscribing = async () => {
    if (!isUserLoggedin) return;
    setIsSubscribed(false); // Optimistic UI update
    setSubscribersCount((prev) => prev - 1);
    try {
      const response = await subscriptionService.unsubscribeUser(userid);

      console.log("response of unsubscribe api call is", response);
      // Optionally refetch video details here if you want to sync state
    } catch (error) {
      setIsSubscribed(true); // Rollback on error
      console.log("unsubscription failed due to error", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="w-full py-[30px] px-[10px] lg:px-[25px] gap-[40px] flex flex-col">
      {/* <CoverImage image={coverimage} /> */}
      <div className="w-full md:w-fit md:mx-auto flex flex-col md:flex-row items-center justify-center md:justify-normal px-[15px] md:px-[40px] py-[15px] md:py-[30px] gap-[50px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]">
        <div className="relative flex items-center justify-center gap-[20px]">
          <ProfileImage
            profileImage={channelData.Avatar}
            isOnline={false}
            mainDivClassName="w-fit"
          />
          <SubscriberDetail
            name={channelData.FullName}
            id={channelData.UserName}
            subscribers={subscribersCount}
            videos={channelData.VideoCount}
          />
        </div>
        <div className="w-full md:w-fit px-[20px]">
          <SubscribeBtn
            isSubscribed={isSubscribed}
            width="w-full md:w-[270px]"
            handleSubscribing={handleSubscribing}
            handleUnsubscribing={handleUnsubscribing}
            setParentShowPrompt={setShowPrompt}
          />
        </div>
        {showPrompt && isMobile && (
            <div
              className="block absolute md:hidden top-[250px] left-5 z-50 px-[10px] py-[10px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit whitespace-nowrap rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
              style={{ wordSpacing: "5px" }}
            >
              Please{" "}
              <span Link className="text-blue-500">
                <Link to="/login">login</Link>
              </span>
              ! to Subscribe
            </div>
          )}
      </div>
      <div className="flex flex-wrap gap-[20px] justify-center">
        {channelData?.Videos.map((video) => (
          <Link to={`/youtube/playing/${video._id}`}>
            <ThumbnailCard
              key={video._id}
              thumbnailSrc={video.Thumbnail}
              title={video.Title}
              channelIcon={video.Owner?.Avatar}
              channelName={video.Owner?.FullName}
              views={`${formatCompactNumber(video.views)}`}
              uploadTime={formatTimeAgo(video.createdAt)} // This would need to be calculated from the video data
              duration={formatDuration(video.Duration)}
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
