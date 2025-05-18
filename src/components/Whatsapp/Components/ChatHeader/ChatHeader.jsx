import React from "react";
import { selectChatData } from "../../../../redux/slices/sidebarChatSlice";
import { formatLastSeen } from "../../utils/lastSeenFormatter";
import { useSelector } from "react-redux";
import {
selectIsUserOnline, selectlastSeenUsers
} from "../../../../redux/slices/chatSlice";

const ChatHeader = ({ name, profileImage }) => {
  // const onlineUsers = useSelector(selectIsUserOnline);
  const lastSeenUsers = useSelector(selectlastSeenUsers);
  const selectedChat = useSelector(selectChatData);

  const isOnline = useSelector((state) => selectIsUserOnline(state, selectedChat?.id));

  console.log("before onlines users is", isOnline, "lastseen users are", lastSeenUsers)


  const lastSeenTimestamp = !isOnline
    ? lastSeenUsers[selectedChat?.id]
    : null;

    console.log("value in chatheader, isonline is", isOnline, "lastseentimestamp is", lastSeenTimestamp)

  return (
    <div
      className={`w-full px-[10px] md:px-[20px] md:py-3 py-[8px] flex justify-start items-start gap-[13px] cursor-pointer rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]`}
    >
      {/* Profile Image */}
      <div className="w-[45px] h-[45px] md:w-[69px] md:h-[69px] rounded-full overflow-hidden flex-shrink-0">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-[4px]">
        <span className="text-[17px] md:text-[20px] text-[#181717] font-bold">{name}</span>
        {/* text color is text-[#414651] */}
        <span className="text-[14px] itali md:text-[15px]  font-semibold text-green-500">
          {isOnline ? "Online" : formatLastSeen(lastSeenTimestamp) || "Offline"}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
