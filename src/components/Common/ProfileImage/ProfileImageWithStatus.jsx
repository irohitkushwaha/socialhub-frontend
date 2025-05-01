import React from "react";
import EditIcon from "../../ui/EditIcon";

const ProfileImageWithStatus = ({
  profileImage,
  name,
  email,
  username,
  editMode = false,
  onEditClick,
  isOnline = true,
  nameTextSize = "text-[14px]",
  usernameTextSize = "text-[14px]",
  emailTextSize = "text-[14px]",
  // nameTextColor = "text-[#414651]",
  nameTextColor = "text-black",
  gapbetweentext = "gap-[4px]",

  gapbtweenImageAndText,
  mainDivClassName,
  imgDesktopSize = "md:w-[150px] md:h-[150px]",
  imgMobileSize = "w-[90px] h-[90px]",
}) => {
  return (
    <div
      className={`flex items-center justify-between ${mainDivClassName} ${gapbtweenImageAndText}`}
    >
      <div className="relative overflow-visible">
        <img
          src={profileImage}
          className={`rounded-full object-cover ${imgDesktopSize} ${imgMobileSize}`}
          // style={{
          //   width: `${size}px`,
          //   height: `${size}px`
          // }}
        />
        {/* Green Online Indicator Dot */}
        {isOnline && (
          <div className="absolute bottom-1 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        )}

        {/* Edit Icon */}
        {editMode && (
          <div className="absolute -top-2 -right-2 z-[9999]">
            <EditIcon onClick={onEditClick} />
          </div>
        )}
      </div>

      <div className={`flex flex-col ${gapbetweentext}`}>
        <span className={`${nameTextSize} font-semibold ${nameTextColor}`}>
          {name}
        </span>
        <span className={`${usernameTextSize} text-[#535862]`}>{username}</span>

        <span className={`${emailTextSize} text-[#535862]`}>{email}</span>
      </div>
    </div>
  );
};

export default ProfileImageWithStatus;
