import React, { useState, useEffect } from "react";
import SubscriberItem from "../../components/Youtube/Components/SubscriberItem/SubscriberItem";
import { selectHasInteracted } from '../../redux/slices/userInteractionSlice';
import { useSelector } from "react-redux";
const SubscribedTo = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const globalHasInteracted = useSelector(selectHasInteracted);

  console.log(
    "Global Has ineracted value as component mount IN SubscribedTo",
    globalHasInteracted
  );


  useEffect(() => {
    // In a real app, this would be an API call to fetch subscribed channels
    // For now, using sample data that matches the API response format
    const fetchSubscribedChannels = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Sample data matching the backend API format for subscribed channels
        const sampleChannels = [
          {
            UserName: "codingacademy",
            FullName: "Coding Academy",
            Email: "info@codingacademy.com",
            Avatar: "https://placehold.co/400x400/4285F4/ffffff?text=CA",
            SubscribersCount: 1250000,
          },
          {
            UserName: "techworld",
            FullName: "Tech World",
            Email: "contact@techworld.com",
            Avatar: "https://placehold.co/400x400/EA4335/ffffff?text=TW",
            SubscribersCount: 875000,
          },
          {
            UserName: "javascriptmastery",
            FullName: "JavaScript Mastery",
            Email: "help@jsmastery.com",
            Avatar: "https://placehold.co/400x400/FBBC05/000000?text=JS",
            SubscribersCount: 650000,
          },
          {
            UserName: "webdevsimplified",
            FullName: "Web Dev Simplified",
            Email: "kyle@webdevsimplified.com",
            Avatar: "https://placehold.co/400x400/34A853/ffffff?text=WD",
            SubscribersCount: 930000,
          },
          {
            UserName: "designcourse",
            FullName: "Design Course",
            Email: "gary@designcourse.com",
            Avatar: "https://placehold.co/400x400/9C27B0/ffffff?text=DC",
            SubscribersCount: 580000,
          },
          {
            UserName: "traversymedia",
            FullName: "Traversy Media",
            Email: "brad@traversymedia.com",
            Avatar: "https://placehold.co/400x400/FF5722/ffffff?text=TM",
            SubscribersCount: 1850000,
          },
          {
            UserName: "fireship",
            FullName: "Fireship",
            Email: "jeff@fireship.io",
            Avatar: "https://placehold.co/400x400/2196F3/ffffff?text=FS",
            SubscribersCount: 2100000,
          },
          {
            UserName: "netninja",
            FullName: "The Net Ninja",
            Email: "shaun@netninja.dev",
            Avatar: "https://placehold.co/400x400/E91E63/ffffff?text=NN",
            SubscribersCount: 1350000,
          },
          {
            UserName: "devaslife",
            FullName: "Devas Life",
            Email: "takuya@devas.life",
            Avatar: "https://placehold.co/400x400/3F51B5/ffffff?text=DL",
            SubscribersCount: 420000,
          },
          {
            UserName: "codewithantonio",
            FullName: "Code With Antonio",
            Email: "antonio@codewith.dev",
            Avatar: "https://placehold.co/400x400/009688/ffffff?text=CW",
            SubscribersCount: 320000,
          },
        ];

        setChannels(sampleChannels);
      } catch (error) {
        console.error("Error fetching subscribed channels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribedChannels();
  }, []);

  // Helper function to format subscriber count
  const formatSubscriberCount = (count) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="px-[8px] py-[20px] md:px-[10px] w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Channels You're Subscribed To
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading channels...</p>
        </div>
      ) : channels.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">You haven't subscribed to any channels yet.</p>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center px-[50px]">
          <div className="flex flex-wrap gap-6 justify-start">
            {channels.map((channel, index) => (
              <SubscriberItem
                key={index}
                profileImage={channel.Avatar}
                name={channel.FullName}
                email={channel.Email}
                subscriberCount={formatSubscriberCount(
                  channel.SubscribersCount
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribedTo;
