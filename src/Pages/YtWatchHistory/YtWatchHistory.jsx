// import WatchHistoryVideo from "../../components/Youtube/Components/WatchHistory/watchhistoryvideo";
// import { useMediaQuery } from "../../hooks/useMediaQuery";
// import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard";

import React, { useState, useEffect } from "react";
import WatchHistoryVideo from "../../components/Youtube/Components/WatchHistory/watchhistoryvideo";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard";

function YtWatchHistory() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - This would be replaced with a real API call
    setTimeout(() => {
      setWatchHistory(sampleWatchHistory);
      setLoading(false);
    }, 100);
  }, []);

  // Function to format view counts
  const formatViews = (viewCount) => {
    if (viewCount >= 1000000) {
      return (viewCount / 1000000).toFixed(1) + 'M';
    } else if (viewCount >= 1000) {
      return (viewCount / 1000).toFixed(1) + 'K';
    }
    return viewCount.toString();
  };

  // Function to format duration
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Function to calculate relative time from timestamp
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const videoDate = new Date(timestamp);
    const diffInDays = Math.floor((now - videoDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) {
      const diffInHours = Math.floor((now - videoDate) / (1000 * 60 * 60));
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - videoDate) / (1000 * 60));
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    } else {
      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="mx-auto w-full overflow-x-hidden">      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-[50px] w-full">
          {watchHistory[0]?.WatchHistory.map((video) => (
            <div key={video._id} className="w-full md:w-[1000px] mx-auto flex justify-center px-[10px]">
              {isMobile ? (
                <ThumbnailCard 
                  thumbnailSrc={video.Thumbnail}
                  title={video.Title}
                  channelIcon={video.Owner.Avatar}
                  channelName={video.Owner.FullName}
                  views={formatViews(video.views)}
                  uploadTime={getRelativeTime(video.timestamp)}
                  duration={formatDuration(video.Duration)}
                />
              ) : (
                <WatchHistoryVideo 
                  thumbnailSrc={video.Thumbnail}
                  title={video.Title}
                  channelIcon={video.Owner.Avatar}
                  channelName={video.Owner.FullName}
                  views={formatViews(video.views)}
                  uploadTime={getRelativeTime(video.timestamp)}
                  duration={formatDuration(video.Duration)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sample data based on the MongoDB aggregation from backend
const sampleWatchHistory = [
  {
    WatchHistory: [
      {
        _id: "video1",
        Title: "Building a Full-Stack MERN Application in 2023",
        Description: "Learn how to build a complete application using MongoDB, Express, React and Node.js",
        views: 1250000,
        Duration: 845, // in seconds (14:05)
        Thumbnail: "https://i.ytimg.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
        timestamp: "2023-06-15T10:30:00Z",
        Owner: {
          _id: "user1",
          FullName: "JavaScript Mastery",
          Avatar: "https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video2",
        Title: "React Authentication Tutorial – Context, Hooks, Private Routes",
        Description: "Learn how to handle user authentication in React using Context API and custom hooks",
        views: 782000,
        Duration: 1205, // in seconds (20:05)
        Thumbnail: "https://i.ytimg.com/vi/PKwu15ldZ7k/maxresdefault.jpg",
        timestamp: "2023-07-21T14:45:00Z",
        Owner: {
          _id: "user2",
          FullName: "Web Dev Simplified",
          Avatar: "https://yt3.googleusercontent.com/ytc/AOPolaQ2iMmw9cWFFjnwa13nBwtZQbl-AqGYkkiTqNaTLg=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video3",
        Title: "Responsive CSS Grid Tutorial",
        Description: "Learn how to create responsive layouts using CSS Grid",
        views: 415000,
        Duration: 625, // in seconds (10:25)
        Thumbnail: "https://i.ytimg.com/vi/68O6eOGAGqA/maxresdefault.jpg",
        timestamp: "2023-08-05T09:15:00Z",
        Owner: {
          _id: "user3",
          FullName: "Kevin Powell",
          Avatar: "https://yt3.googleusercontent.com/ytc/AOPolaRQXALirhNBTJboYg7VCIxNOIYHl41TOTfGF4-dUA=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video4",
        Title: "MongoDB Crash Course 2023",
        Description: "Everything you need to know about MongoDB",
        views: 328000,
        Duration: 1845, // in seconds (30:45)
        Thumbnail: "https://i.ytimg.com/vi/2QQGWYe7IDU/maxresdefault.jpg",
        timestamp: "2023-06-28T11:20:00Z",
        Owner: {
          _id: "user4",
          FullName: "Traversy Media",
          Avatar: "https://yt3.googleusercontent.com/ytc/AOPolaQ2iMmw9cWFFjnwa13nBwtZQbl-AqGYkkiTqNaTLg=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video5",
        Title: "NextJS 13 Full Course - App Router, Server Components and More",
        Description: "Learn NextJS 13 features in this comprehensive tutorial",
        views: 950000,
        Duration: 3605, // in seconds (1:00:05)
        Thumbnail: "https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg",
        timestamp: "2023-08-12T16:30:00Z",
        Owner: {
          _id: "user5",
          FullName: "Coding With Josh",
          Avatar: "https://yt3.googleusercontent.com/ytc/AOPolaRbD9-MQc9HnrYf3rJFzz7b38pu-owMSPLXKesUOQ=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video6",
        Title: "Tailwind CSS Crash Course",
        Description: "Learn the basics of Tailwind CSS in this crash course",
        views: 620000,
        Duration: 1525, // in seconds (25:25)
        Thumbnail: "https://i.ytimg.com/vi/UBOj6rqRUME/maxresdefault.jpg",
        timestamp: "2023-07-03T13:45:00Z",
        Owner: {
          _id: "user6",
          FullName: "Net Ninja",
          Avatar: "https://yt3.googleusercontent.com/ytc/AOPolaSVwMTFzcnF-4M9dF1cF_FEUnKlX1Cvuis_CG_7=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video7",
        Title: "Learn TypeScript In 50 Minutes",
        Description: "A quick but comprehensive TypeScript tutorial",
        views: 480000,
        Duration: 3025, // in seconds (50:25)
        Thumbnail: "https://i.ytimg.com/vi/WBPrJSw7yQA/maxresdefault.jpg",
        timestamp: "2023-08-20T10:10:00Z",
        Owner: {
          _id: "user7",
          FullName: "Codevolution",
          Avatar: "https://yt3.googleusercontent.com/os7Yw6RimtysXXpc8NrXraci87TjXgZSUQyAezi0D3RrNL3YP5riIwi1-0al4Wz0XwzH6oBu6g=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video8",
        Title: "Clean Code - Uncle Bob / Coding Best Practices",
        Description: "Learn how to write cleaner, better code",
        views: 1850000,
        Duration: 4825, // in seconds (1:20:25)
        Thumbnail: "https://i.ytimg.com/vi/7EmboKQH8lM/maxresdefault.jpg",
        timestamp: "2023-05-25T15:30:00Z",
        Owner: {
          _id: "user8",
          FullName: "Coding With Mosh",
          Avatar: "https://yt3.googleusercontent.com/ytc/AOPolaTs1IEit9EUooQAJkWS4SkpUE7oMDXYrjIgnOk1Kw=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video9",
        Title: "5 React Hooks You Need in Every Project",
        Description: "Essential React Hooks for all your projects",
        views: 720000,
        Duration: 905, // in seconds (15:05)
        Thumbnail: "https://i.ytimg.com/vi/0c6znExIqRw/maxresdefault.jpg",
        timestamp: "2023-07-15T09:25:00Z",
        Owner: {
          _id: "user9",
          FullName: "Fireship",
          Avatar: "https://yt3.googleusercontent.com/ytc/AOPolaQ2iMmw9cWFFjnwa13nBwtZQbl-AqGYkkiTqNaTLg=s176-c-k-c0x00ffffff-no-rj"
        }
      },
      {
        _id: "video10",
        Title: "Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]",
        Description: "Learn Kubernetes from scratch in this full course",
        views: 2150000,
        Duration: 14405, // in seconds (4:00:05)
        Thumbnail: "https://i.ytimg.com/vi/X48VuDVv0do/maxresdefault.jpg",
        timestamp: "2023-06-10T12:00:00Z",
        Owner: {
          _id: "user10",
          FullName: "TechWorld with Nana",
          Avatar: "https://yt3.googleusercontent.com/ytc/AOPolaSDrcjYY-UL4-u-VJUJ48vfnPnDqH_dxtewAPSGaA=s176-c-k-c0x00ffffff-no-rj"
        }
      }
    ]
  }
];

export default YtWatchHistory;