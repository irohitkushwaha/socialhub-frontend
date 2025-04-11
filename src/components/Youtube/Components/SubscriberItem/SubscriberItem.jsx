import React from 'react';

// Individual Subscriber Component
const SubscriberItem = ({ profileImage, name, email, subscriberCount }) => {
  return (
    <div className="w-[328px] py-4 px-[11px] border border-[#E9EAEB] rounded-[16px] shadow-[0_7px_16px_-4px_rgba(10,13,18,0.08),0_4px_6px_-2px_rgba(10,13,18,0.03)] bg-white">
      <div className="flex items-center gap-4">
        {/* Profile Image with Green Dot */}
        <div className="relative">
          <img 
            src={profileImage} 
            alt={`${name}'s profile`} 
            className="w-[66px] h-[66px] rounded-full object-cover"
          />
          {/* Green Online Indicator Dot */}
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        {/* Subscriber Information */}
        <div className="flex flex-col">
          <h3 className="text-[20px] font-semibold text-[#414651] font-inter">{name}</h3>
          <p className="text-[12px] font-semibold text-[#414651] font-inter">{email}</p>
          <p className="text-[16px] font-semibold text-[#414651] font-inter mt-1">
            {subscriberCount} - Subscribers
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriberItem; 