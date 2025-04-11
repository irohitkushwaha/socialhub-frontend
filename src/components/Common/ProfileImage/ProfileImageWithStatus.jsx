import React from "react";
import EditIcon from "./EditIcon";

const ProfileImageWithStatus = ({
  profileImage,
  size = 50,
  name,
  email,
  editMode = false,
  onEditClick,
  isOnline = true,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative overflow-visible">
        <img
          src={profileImage}
          className="rounded-full object-cover"
          style={{ width: `${size}px`, height: `${size}px` }}
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

      <div className="flex flex-col">
        <span className="text-[14px] font-semibold text-[#414651]">{name}</span>
        <span className="text-[14px] text-[#535862]">{email}</span>
      </div>
    </div>
  );
};

export default ProfileImageWithStatus;
