import React, { useState, useEffect } from "react";
import SubscriberItem from "../../components/Youtube/Components/SubscriberItem/SubscriberItem";
import { subscriptionService } from "../../Services/api/Subscription.Service";
import { isLoggedin } from "../../redux/slices/authentication.slice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { formatCompactNumber } from "../../utils/formatCompactNumber";

const SubscribedTo = () => {
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isUserLoggedIn = useSelector(isLoggedin);

  useEffect(() => {
    if (isUserLoggedIn) {
      async function getSubscribedChannels() {
        try {
          const response = await subscriptionService.getSubscribedToList();
          console.log("Subscribed channels response:", response);
          setSubscribedChannels(response);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching subscribed channels:", error);
          setLoading(false);
        }
      }
      getSubscribedChannels();
    }
  }, [isUserLoggedIn]);

  return (
    <div className="px-[8px] py-[20px] md:px-[10px] w-full">
      {isUserLoggedIn && (
        <h1 className="text-2xl text-center md:text-3xl font-bold mb-8">
          My Subscriptions
        </h1>
      )}
      {!isUserLoggedIn ? (
        <div
          className="px-[15px] py-[20px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit mx-auto mt-[100px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
          style={{ wordSpacing: "5px" }}
        >
          Please{" "}
          <span className="text-blue-500">
            <Link to="/login">login</Link>
          </span>
          ! to see your Subscriptions
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : subscribedChannels.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No subscriptions yet
            </h2>
            <p className="text-gray-500 mt-2">
              Subscribe to channels to see their latest content!
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center px-[50px]">
          <div className="flex flex-wrap gap-6 justify-start">
            {subscribedChannels.map((channel, index) => (
              <SubscriberItem
                key={index}
                profileImage={channel.Avatar}
                name={channel.FullName}
                email={channel.Email}
                subscriberCount={formatCompactNumber(
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