// import WatchHistoryVideo from "../../components/Youtube/Components/WatchHistory/watchhistoryvideo";
// import { useMediaQuery } from "../../hooks/useMediaQuery";
// import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard";

import React, { useState, useEffect } from "react";
import WatchHistoryVideo from "../../components/Youtube/Components/WatchHistory/watchhistoryvideo";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ThumbnailCard from "../../components/Youtube/Components/ThumbnailCard/ThumbnailCard";
const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // In a real app, this would be an API call to fetch liked videos
    // For now, using sample data that matches the API response format

    // Simulating API call delay
    const fetchLikedVideos = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Sample data matching the API format
        const sampleLikedVideos = [
          {
            Title:
              "How to Build a Full Stack Application with React and Node.js",
            Description:
              "Learn how to build modern full-stack applications using React for frontend and Node.js for backend",
            views: 125000,
            Duration: "25:40",
            Thumbnail:
              "https://placehold.co/400x225/4285F4/ffffff?text=React+Node",
            Owner: {
              FullName: "Tech Tutorials",
              Avatar: "https://placehold.co/40x40/FF5722/ffffff?text=TT",
            },
            createdAt: "2023-10-15T13:45:32.000Z",
          },
          {
            Title: "Modern JavaScript ES6+ Features You Should Know",
            Description:
              "Exploring the most important features of modern JavaScript that every developer should know",
            views: 89000,
            Duration: "18:22",
            Thumbnail: "https://placehold.co/400x225/FFEB3B/000000?text=JS",
            Owner: {
              FullName: "JavaScript Masters",
              Avatar: "https://placehold.co/40x40/FFC107/000000?text=JS",
            },
            createdAt: "2023-11-02T09:21:15.000Z",
          },
          {
            Title: "MongoDB Complete Tutorial for Beginners",
            Description:
              "Learn MongoDB from scratch with this comprehensive tutorial for beginners",
            views: 65400,
            Duration: "42:15",
            Thumbnail:
              "https://placehold.co/400x225/4CAF50/ffffff?text=MongoDB",
            Owner: {
              FullName: "Database Pros",
              Avatar: "https://placehold.co/40x40/4CAF50/ffffff?text=DB",
            },
            createdAt: "2023-11-15T16:38:44.000Z",
          },
          {
            Title: "CSS Flexbox and Grid: The Complete Guide",
            Description:
              "Master modern CSS layouts with Flexbox and Grid with practical examples",
            views: 112300,
            Duration: "32:18",
            Thumbnail: "https://placehold.co/400x225/9C27B0/ffffff?text=CSS",
            Owner: {
              FullName: "Frontend Focus",
              Avatar: "https://placehold.co/40x40/9C27B0/ffffff?text=FF",
            },
            createdAt: "2023-10-28T14:15:22.000Z",
          },
          {
            Title: "TypeScript for React Developers",
            Description:
              "Learn how to use TypeScript with React to build type-safe applications",
            views: 78500,
            Duration: "28:45",
            Thumbnail:
              "https://placehold.co/400x225/3F51B5/ffffff?text=TS+React",
            Owner: {
              FullName: "TypeScript Guru",
              Avatar: "https://placehold.co/40x40/3F51B5/ffffff?text=TS",
            },
            createdAt: "2023-09-19T11:20:36.000Z",
          },
          {
            Title: "Docker and Kubernetes for Beginners",
            Description:
              "Getting started with containerization using Docker and Kubernetes",
            views: 92700,
            Duration: "45:33",
            Thumbnail:
              "https://placehold.co/400x225/2196F3/ffffff?text=Docker+K8s",
            Owner: {
              FullName: "DevOps Mastery",
              Avatar: "https://placehold.co/40x40/2196F3/ffffff?text=DO",
            },
            createdAt: "2023-08-05T08:42:19.000Z",
          },
          {
            Title: "RESTful API Design Best Practices",
            Description:
              "Learn how to design and build RESTful APIs that follow best practices",
            views: 56800,
            Duration: "22:14",
            Thumbnail: "https://placehold.co/400x225/FF5722/ffffff?text=API",
            Owner: {
              FullName: "Backend Developers",
              Avatar: "https://placehold.co/40x40/FF5722/ffffff?text=BD",
            },
            createdAt: "2023-10-10T15:18:27.000Z",
          },
          {
            Title: "Advanced React Hooks: Beyond useState and useEffect",
            Description:
              "Dive deep into advanced React hooks and learn when and how to use them",
            views: 105800,
            Duration: "36:52",
            Thumbnail:
              "https://placehold.co/400x225/00BCD4/ffffff?text=React+Hooks",
            Owner: {
              FullName: "React Masters",
              Avatar: "https://placehold.co/40x40/00BCD4/ffffff?text=RM",
            },
            createdAt: "2023-11-28T16:45:31.000Z",
          },
          {
            Title: "Build a MERN Stack E-commerce Website",
            Description:
              "Step-by-step guide to building a full e-commerce application with the MERN stack",
            views: 137200,
            Duration: "1:15:20",
            Thumbnail: "https://placehold.co/400x225/E91E63/ffffff?text=MERN",
            Owner: {
              FullName: "Web Dev Journey",
              Avatar: "https://placehold.co/40x40/E91E63/ffffff?text=WD",
            },
            createdAt: "2023-09-05T09:32:14.000Z",
          },
          {
            Title: "Git and GitHub: From Beginner to Advanced",
            Description:
              "Complete tutorial on Git and GitHub, covering everything from basics to advanced workflows",
            views: 83400,
            Duration: "47:28",
            Thumbnail: "https://placehold.co/400x225/795548/ffffff?text=Git",
            Owner: {
              FullName: "Code Version Pro",
              Avatar: "https://placehold.co/40x40/795548/ffffff?text=CV",
            },
            createdAt: "2023-11-12T13:24:56.000Z",
          },
        ];

        setLikedVideos(sampleLikedVideos);
      } catch (error) {
        console.error("Error fetching liked videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Helper function to format view count
  const formatViews = (views) => {
    if (views < 1000) return views.toString();
    if (views < 1000000) return `${(views / 1000).toFixed(1)}K`;
    return `${(views / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="mx-auto w-full overflow-x-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : likedVideos.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">You haven't liked any videos yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-[50px] w-full">
          {likedVideos.map((video, index) => (
            <div
              key={video._id}
              className="w-full md:w-[1000px] mx-auto flex justify-center px-[10px]"
            >
              {isMobile ? (
                <ThumbnailCard
                  key={index}
                  thumbnailSrc={video.Thumbnail}
                  title={video.Title}
                  channelIcon={video.Owner.Avatar}
                  channelName={video.Owner.FullName}
                  views={formatViews(video.views)}
                  uploadTime={formatDate(video.createdAt)}
                  duration={video.Duration}
                />
              ) : (
                <WatchHistoryVideo
                  key={index}
                  thumbnailSrc={video.Thumbnail}
                  title={video.Title}
                  channelIcon={video.Owner.Avatar}
                  channelName={video.Owner.FullName}
                  views={formatViews(video.views)}
                  uploadTime={formatDate(video.createdAt)}
                  duration={video.Duration}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedVideos;
