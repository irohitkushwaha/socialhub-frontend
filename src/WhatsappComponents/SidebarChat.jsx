import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChatData,
  selectChatIsSelected,
} from "../redux/slices/sidebarChatSlice";

const SidebarChat = ({ id, name, email, profileImage }) => {
  const dispatch = useDispatch();
  const selectedChatData = useSelector(selectChatData);
  const isAnySelected = useSelector(selectChatIsSelected);

  // This chat is selected if selection is active and IDs match
  const isSelected = isAnySelected && selectedChatData.id === id;

  const handleChatSelect = () => {
    dispatch(selectChat({ id, name, email, profileImage }));
  };

  return (
    <div
      className={`w-full md:w-[348px] px-12 py-3 flex items-center gap-[13px] cursor-pointer ${
        isSelected ? "bg-[#F0F0F0]" : ""
      }`}
      onClick={handleChatSelect}
    >
      {/* Profile Image */}
      <div className="w-[69px] h-[69px] rounded-full overflow-hidden flex-shrink-0">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-[6px]">
        <span className="text-[18px] text-[#181717] font-medium">{name}</span>
        <span className="text-[15px] text-[#181717]">{email}</span>
      </div>
    </div>
  );
};

export default SidebarChat;
