// import React from 'react'
// import WatchHistory from "../../components/Youtube/Components/WatchHistory"
// import UserSearch from '../../components/Youtube/Components/UserSearch'

// function YtSearch() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default YtSearch

import React, { useState, useEffect } from "react";
import WatchHistoryVideo from "../../components/Youtube/Components/WatchHistory/watchhistoryvideo";
import UserSearch from "../../components/Youtube/Components/UserSearch/UserSearch";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard";

function YtSearch() {
  // Sample response data that would come from the Elasticsearch API
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // This would be replaced with actual API call
    // Simulating API response with sample data
    const sampleData = [
      // Users (4 samples)
      {
        _id: "u1",
        type: "user",
        FullName: "Rohit Sharma",
        Username: "@hitman45",
        Avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        _id: "u2",
        type: "user",
        FullName: "Priya Patel",
        Username: "@priyapatels",
        Avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        _id: "u3",
        type: "user",
        FullName: "Varun Dhawan",
        Username: "@varundhawan",
        Avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        _id: "u4",
        type: "user",
        FullName: "Anushka Sharma",
        Username: "@anushkasharma",
        Avatar: "https://randomuser.me/api/portraits/women/29.jpg",
      },

      // Videos (6 samples)
      {
        _id: "v1",
        type: "video",
        Title: "Complete React Tutorial for Beginners in Hindi",
        views: "1.2M",
        Thumbnail: "https://i.ytimg.com/vi/RGKi6LSPDLU/hqdefault.jpg",
        Duration: "12:45",
        timeStamp: new Date("2023-05-15").getTime(),
        Owner: [
          {
            FullName: "Tech With Rohit",
            Username: "@techwithrohit",
            Avatar: "https://randomuser.me/api/portraits/men/11.jpg",
          },
        ],
      },
      {
        _id: "v2",
        type: "video",
        Title: "How to Build a Full Stack MERN Application",
        views: "850K",
        Thumbnail: "https://i.ytimg.com/vi/7CqJlxBYj-M/hqdefault.jpg",
        Duration: "25:18",
        timeStamp: new Date("2023-06-22").getTime(),
        Owner: [
          {
            FullName: "Coding Ninjas",
            Username: "@codingninjas",
            Avatar: "https://randomuser.me/api/portraits/men/42.jpg",
          },
        ],
      },
      {
        _id: "v3",
        type: "video",
        Title: "MongoDB Crash Course 2023",
        views: "420K",
        Thumbnail: "https://i.ytimg.com/vi/2QQGWYe7IDU/hqdefault.jpg",
        Duration: "15:30",
        timeStamp: new Date("2023-07-30").getTime(),
        Owner: [
          {
            FullName: "Web Dev Simplified",
            Username: "@webdevsimplified",
            Avatar: "https://randomuser.me/api/portraits/men/55.jpg",
          },
        ],
      },
      {
        _id: "v4",
        type: "video",
        Title: "UI/UX Design Fundamentals for Beginners",
        views: "315K",
        Thumbnail: "https://i.ytimg.com/vi/c9Wg6Cb_YlU/hqdefault.jpg",
        Duration: "18:22",
        timeStamp: new Date("2023-04-12").getTime(),
        Owner: [
          {
            FullName: "Design Masters",
            Username: "@designmasters",
            Avatar: "https://randomuser.me/api/portraits/women/62.jpg",
          },
        ],
      },
      {
        _id: "v5",
        type: "video",
        Title: "Next.js 13 Full Course - App Router",
        views: "680K",
        Thumbnail: "https://i.ytimg.com/vi/wm5gMKuwSYk/hqdefault.jpg",
        Duration: "32:47",
        timeStamp: new Date("2023-08-05").getTime(),
        Owner: [
          {
            FullName: "JavaScript Mastery",
            Username: "@javascriptmastery",
            Avatar: "https://randomuser.me/api/portraits/men/33.jpg",
          },
        ],
      },
      {
        _id: "v6",
        type: "video",
        Title: "Understanding TypeScript - Full Tutorial",
        views: "520K",
        Thumbnail: "https://i.ytimg.com/vi/BwuLxPH8IDs/hqdefault.jpg",
        Duration: "22:15",
        timeStamp: new Date("2023-03-18").getTime(),
        Owner: [
          {
            FullName: "TypeScript Guru",
            Username: "@typescriptguru",
            Avatar: "https://randomuser.me/api/portraits/men/77.jpg",
          },
        ],
      },
    ];

    setSearchResults(sampleData);
    setLoading(false);
  }, []);

  // Helper function to format timestamp to relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date().getTime();
    const diff = now - timestamp;

    // Convert to days, hours, etc.
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 30) {
      const months = Math.floor(days / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className=" mx-auto w-full overflow-x-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-[50px] w-full">
          {searchResults.map((item) => (
            <div key={item._id} className="w-full md:w-[1000px] mx-auto flex justify-center px-[10px]">
              {item.type === "user" ? (
                <UserSearch
                  profileImage={item.Avatar}
                  name={item.FullName}
                  username={item.Username}
                />
              ) : isMobile ? (
                <ThumbnailCard
                  thumbnailSrc={item.Thumbnail}
                  title={item.Title}
                  channelIcon={item.Owner[0].Avatar}
                  channelName={item.Owner[0].FullName}
                  views={item.views}
                  uploadTime={getRelativeTime(item.timeStamp)}
                  duration={item.Duration}
                />
              ) : (
                <WatchHistoryVideo
                  thumbnailSrc={item.Thumbnail}
                  title={item.Title}
                  channelIcon={item.Owner[0].Avatar}
                  channelName={item.Owner[0].FullName}
                  views={item.views}
                  uploadTime={getRelativeTime(item.timeStamp)}
                  duration={item.Duration}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YtSearch;
