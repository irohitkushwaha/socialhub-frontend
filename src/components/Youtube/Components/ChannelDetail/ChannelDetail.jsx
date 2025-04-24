import React, { useState, useEffect } from "react";
import shradha from "../../../../assets/shradha.jpg";

// Bell ring animation style
const bellRingStyle = `
  @keyframes manualBellRing {
   0% { transform: rotate(0deg); }
    10% { transform: rotate(40deg); }    /* Changed from 45 to 40 */
    20% { transform: rotate(-30deg); }   /* Adjusted proportionally */
    30% { transform: rotate(22deg); }    /* Adjusted proportionally */
    40% { transform: rotate(-15deg); }   
    50% { transform: rotate(8deg); }     
    60% { transform: rotate(-5deg); }    
    70%, 100% { transform: rotate(0deg); }
  }
  .bell-ring-animation {
    animation: manualBellRing 1.7s ease-in-out;
    transform-origin: top;
  }
`;

const ChannelDetail = ({
  channelName = "Shradha Khapra",
  subscribers = "4.9M",
  profileImage = shradha,
  isSubscribed = false,
}) => {
  const [isSubscribe, setIsSubscribe] = useState(isSubscribed);
  // New state just to track animation key
  const [animationCounter, setAnimationCounter] = useState(0);

  const handleSubscribe = () => {
    setIsSubscribe(!isSubscribe);

    // Always increment the animation counter when switching to subscribed
    if (!isSubscribe) {
      setAnimationCounter((prev) => prev + 1);
    }
  };

  // The key is to render the bell icon ALWAYS, not conditionally
  // This ensures the animation can play properly
  return (
    <>
      {/* Animation style */}
      <style dangerouslySetInnerHTML={{ __html: bellRingStyle }} />

      <div className="flex items-center justify-between sm:justify-normal w-full lg:w-fit sm:gap-[25px] md:px-2">
        {/* Left side - Profile and Channel Info */}
        <div className="flex items-center gap-[7px] md:gap-[9px]">
          {/* Profile Image */}
          <div className="w-[48px] h-[48px] md:w-[55px] md:h-[55px] rounded-full overflow-hidden">
            <img
              src={profileImage}
              alt={`${channelName} profile`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Channel Info */}
          <div className="flex flex-col gap-[4px] md:gap-1.5">
            <h2 className="text-[#181717] text-[16px] md:text-[18px] font-bold font-inter">
              {channelName}
            </h2>
            <p className="text-[#414651] text-[16px] md:text-[17px] font-bold font-inter">
              {subscribers} Subscribers
            </p>
          </div>
        </div>

        {/* Button Container */}
        <div className="relative w-[137px] md:w-[145px] h-[48px]">
          {/* Hack: We need to keep both the SVG animation and the button transition */}
          {/* Subscribed Button */}
          <div
            className={`absolute inset-0 transition-all duration-300 ease-in-out ${
              isSubscribe
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <button
              onClick={handleSubscribe}
              className="flex items-center justify-center gap-[10px] md:gap-[10px] px-[0px] md:px-[0px] py-[8px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] cursor-pointer w-full"
            >
              {/* Subscribed Icon */}
              <div className="w-[28px] h-[28px] md:w-[28px] md:h-[28px]">
                {/* THIS IS THE KEY CHANGE: Using animationCounter as a key to force re-render */}
                <svg
                  key={animationCounter}
                  xmlns="http://www.w3.org/2000/svg"
                  height="full"
                  viewBox="0 -960 960 960"
                  width="full"
                  fill="#00c950"
                  className="origin-top bell-ring-animation" // Apply animation class directly
                >
                  <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                </svg>
              </div>
              <span className="text-[#414651] text-[16px] md:text-[16px] font-bold font-inter">
                Subscribed
              </span>
            </button>
          </div>

          {/* Subscribe Button */}
          <div
            className={`absolute inset-0 transition-all duration-300 ease-in-out  ${
              isSubscribe
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-100 scale-100 pointer-events-auto"
            }`}
          >
            <button
              onClick={handleSubscribe}
              className="cursor-pointer flex items-center justify-center gap-[10px] md:gap-[10px] px-[0px] md:px-[0px] py-[8px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] w-full"
            >
              {/* Green Plus Icon */}
              <div className=" w-[28px] h-[28px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="full"
                  viewBox="0 0 24 24"
                  width="full"
                  fill="#00c950"
                >
                  <rect fill="none" height="24" width="24" x="0" y="0" />
                  <g>
                    <path d="M16,14v3H8v-7c0-2.21,1.79-4,4-4c0.85,0,1.64,0.26,2.28,0.72l1.43-1.43c-0.64-0.51-1.39-0.88-2.21-1.09V3.5 C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5v0.7C7.91,4.86,6,7.21,6,10v7H4v2h16v-2h-2v-3H16z M12,22c1.1,0,2-0.9,2-2h-4 C10,21.1,10.9,22,12,22z M24,8h-3V5h-2v3h-3v2h3v3h2v-3h3V8z" />
                  </g>
                </svg>
              </div>
              <span className="text-[#414651] text-[16px] md:text-[16px] font-bold font-inter">
                Subscribe
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelDetail;
