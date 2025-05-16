import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChat,
  selectChatData,
} from "../../../../redux/slices/sidebarChatSlice";
import { selectIsUserTyping } from "../../../../redux/slices/chatSlice";
import TypewriterEffect from "../../../../utils/typewritereffect.jsx";
import WavyText from "../../../ui/WavyText";

const SidebarProfile = ({ profileImage, name, email, userId }) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector(selectChatData);

  const isTyping = useSelector((state) => selectIsUserTyping(state, userId));

  console.log("receiver user id is", userId);

  // Check if this profile is the currently selected one
  const isSelected = selectedChat.id === userId;

  const handleChatSelect = () => {
    console.log(
      "Selecting chat:",
      userId,
      "Previous selected:",
      selectedChat.id
    );

    // Dispatch the action to select this chat profile
    dispatch(
      selectChat({
        id: userId,
        name,
        email,
        profileImage,
      })
    );
  };

  return (
    <div
      className={`w-full md:w-full px-[12px] md:px-[10px] py-3 flex justify-start items-start
        gap-[15px] cursor-pointer rounded-[6px] ${
          isSelected ? "bg-[#F0F0F0]" : ""
        }`}
      onClick={handleChatSelect}
    >
      {/* Profile Image */}
      <div className="w-[59px] h-[59px] rounded-full overflow-hidden flex-shrink-0">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      {/* User Info */}
      <div className="flex flex-col gap-[4px]">
        <span className="text-[18px] text-[#181717] font-bold">{name}</span>
        {isTyping ? (
          <span className="text-[15px] text-green-500 font-semibold">
            Typing
            <TypewriterEffect
              text="...."
              typingSpeed={150}
              erasingSpeed={100}
              pauseBeforeErasing={0}
              pauseBeforeTyping={0}
              willErase={true}
              loop={true}
              className="inline"
            />
          </span>
        ) : (
          <span className="text-[15px] text-[#414651] font-semibold">
            {email}
          </span>
        )}
      </div>
    </div>
  );
};

export default SidebarProfile;
