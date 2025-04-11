import React from "react";
import shradha from "../assets/shradha.jpg";
import ProfileImageWithStatus from "./ProfileImageWithStatus";

const ProfileImageExample = () => {
  // Example profile image URL
  const userProfileImage = shradha;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Profile Image Example</h2>

      <div className="flex flex-col gap-6">
        <div>
          <ProfileImageWithStatus
            profileImage={userProfileImage}
            // name="Rohit Kushwaha"
            // email="rohit@rohit.com"
            isOnline={false}
            size={150}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageExample;
