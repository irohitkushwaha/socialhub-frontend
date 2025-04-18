import React, { useState, useEffect } from 'react';
import SubscriberItem from '../../components/Youtube/Components/SubscriberItem/SubscriberItem';

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to fetch subscribers
    // For now, using sample data that matches the API response format
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data matching the backend API format
        const sampleSubscribers = [
          {
            UserName: "techguru",
            FullName: "Alex Johnson",
            Email: "alex.johnson@example.com",
            Avatar: "https://placehold.co/400x400/4285F4/ffffff?text=AJ",
            SubscribersCount: 24500
          },
          {
            UserName: "devmaster",
            FullName: "Sarah Williams",
            Email: "sarah.williams@example.com",
            Avatar: "https://placehold.co/400x400/EA4335/ffffff?text=SW",
            SubscribersCount: 18700
          },
          {
            UserName: "codeartist",
            FullName: "Michael Chen",
            Email: "michael.chen@example.com",
            Avatar: "https://placehold.co/400x400/FBBC05/000000?text=MC",
            SubscribersCount: 32100
          },
          {
            UserName: "designpro",
            FullName: "Emily Rodriguez",
            Email: "emily.rodriguez@example.com",
            Avatar: "https://placehold.co/400x400/34A853/ffffff?text=ER",
            SubscribersCount: 15600
          },
          {
            UserName: "uideveloper",
            FullName: "David Kim",
            Email: "david.kim@example.com",
            Avatar: "https://placehold.co/400x400/9C27B0/ffffff?text=DK",
            SubscribersCount: 9800
          },
          {
            UserName: "webwizard",
            FullName: "Jessica Lee",
            Email: "jessica.lee@example.com",
            Avatar: "https://placehold.co/400x400/FF5722/ffffff?text=JL",
            SubscribersCount: 28400
          },
          {
            UserName: "frontendninja",
            FullName: "Robert Taylor",
            Email: "robert.taylor@example.com",
            Avatar: "https://placehold.co/400x400/2196F3/ffffff?text=RT",
            SubscribersCount: 12900
          },
          {
            UserName: "fullstackdev",
            FullName: "Sophie Martin",
            Email: "sophie.martin@example.com",
            Avatar: "https://placehold.co/400x400/E91E63/ffffff?text=SM",
            SubscribersCount: 21500
          },
          {
            UserName: "appdesigner",
            FullName: "Thomas Garcia",
            Email: "thomas.garcia@example.com",
            Avatar: "https://placehold.co/400x400/3F51B5/ffffff?text=TG",
            SubscribersCount: 16700
          },
          {
            UserName: "codingmentor",
            FullName: "Olivia Wilson",
            Email: "olivia.wilson@example.com",
            Avatar: "https://placehold.co/400x400/009688/ffffff?text=OW",
            SubscribersCount: 34200
          }
        ];
        
        setSubscribers(sampleSubscribers);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Helper function to format subscriber count
  const formatSubscriberCount = (count) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="px-[8px] py-[20px] md:px-[10px] w-full">
      <h1 className="text-2xl text-center md:text-3xl font-bold mb-8">My Subscribers</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading subscribers...</p>
        </div>
      ) : subscribers.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">You don't have any subscribers yet.</p>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center px-[50px]">

        <div className="flex flex-wrap gap-6 justify-start">
          {subscribers.map((subscriber, index) => (
            <SubscriberItem
              key={index}
              profileImage={subscriber.Avatar}
              name={subscriber.FullName}
              email={subscriber.Email}
              subscriberCount={formatSubscriberCount(subscriber.SubscribersCount)}
            />
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribers;