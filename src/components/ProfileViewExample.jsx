import React from "react";
import ProfileView from "./ProfileView";

const ProfileViewExample = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-8">Profile View Example</h2>

      <div className="max-w-xl">
        <ProfileView
          name="Shradha Khapra"
          id="@shradhakhapra123"
          email="shradha@apnacollege.com"
          subscribers="4.9M"
          videos="550"
        />
      </div>

      <div className="mt-12 max-w-xl">
        <ProfileView
          name="Code With Harry"
          id="@CodeWithHarry"
          email="harry@codewithharry.com"
          subscribers="5.2M"
          videos="1.2K"
        />
      </div>
    </div>
  );
};

export default ProfileViewExample;
