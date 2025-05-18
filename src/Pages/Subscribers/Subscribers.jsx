import React, { useState, useEffect } from "react";
import SubscriberItem from "../../components/Youtube/Components/SubscriberItem/SubscriberItem";
import { subscriptionService } from "../../Services/api/Subscription.Service";
import { isLoggedin } from "../../redux/slices/authentication.slice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { formatCompactNumber } from "../../utils/formatCompactNumber";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isUserLoggedIn = useSelector(isLoggedin);

  useEffect(() => {
    if (isUserLoggedIn) {
      async function getSubscribers() {
        try {
          const response = await subscriptionService.getSubscribersList();
          console.log("Subscribers response:", response);
          setSubscribers(response);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching subscribers:", error);
          setLoading(false);
        }
      }
      getSubscribers();
    }
  }, [isUserLoggedIn]);
  return (
  
    <div className="px-[8px] py-[20px] md:px-[10px] w-full">
      {isUserLoggedIn && <h1 className="text-2xl text-center md:text-3xl font-bold mb-8">
        My Subscribers
      </h1>
}
      {!isUserLoggedIn ? (
        <div
          className="px-[15px] py-[20px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit mx-auto mt-[100px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
          style={{ wordSpacing: "5px" }}
        >
          Please{" "}
          <span className="text-blue-500">
            <Link to="/login">login</Link>
          </span>
          ! to see your Subscribers
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : subscribers.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No subscribers yet
            </h2>
            <p className="text-gray-500 mt-2">
              Keep creating great content and you'll get subscribers soon!
            </p>
          </div>
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
                subscriberCount={formatCompactNumber(
                  subscriber.SubscribersCount
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribers;
