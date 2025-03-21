import React from "react";

const ProfileView = ({
  name = "Shradha Khapra",
  id = "@shradhakhapra123",
  email = "shradha@apnacollege.com",
  subscribers = "4.9M",
  videos = "550",
}) => {
  return (
    <div className="flex flex-col items-start gap-5 sm:gap-6">
      {/* Name */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#181717]">{name}</h1>

      {/* Channel ID and Email - Only hide email on mobile */}
      <div className="flex flex-col sm:flex-row sm:gap-[21px]">
        <p className="text-lg sm:text-xl font-semibold text-[#414651]">{id}</p>
        <p className="hidden sm:block text-lg sm:text-xl font-semibold text-[#414651]">
          {email}
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-[21px]">
        <p className="text-lg sm:text-xl font-semibold text-[#414651]">
          {subscribers} Subscribers
        </p>
        <p className="text-lg sm:text-xl font-semibold text-[#414651]">
          {videos} Videos
        </p>
      </div>
    </div>
  );
};

export default ProfileView;
