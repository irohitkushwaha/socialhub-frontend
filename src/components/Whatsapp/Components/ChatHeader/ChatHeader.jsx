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

  // const isOnline = Array.isArray(onlineUsers) && selectedChat?.id && onlineUsers.includes(selectedChat?.id);

  const isOnline = useSelector(state => {
    // Safety check if selectedChat exists and has an id property
    if (!selectedChat?.id) return false;
    
    // Get the array of online users
    const onlineUsers = state.chat.onlineUsers;
    
    // Check if the selected user is in the onlineUsers array
    return Array.isArray(onlineUsers) ? onlineUsers.includes(selectedChat.id) : false;
  });

  console.log("before onlines users is", isOnline, "lastseen users are", lastSeenUsers)


  const lastSeenTimestamp = !isOnline
    ? lastSeenUsers[selectedChat.id]
    : null;

    console.log("value in chatheader, isonline is", isOnline, "lastseentimestamp is", lastSeenTimestamp)

  return (
    <div
      className={`w-full px-[12px] md:px-[20px] py-3 flex justify-start items-start gap-[13px] cursor-pointer rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]`}
    >
      {/* Profile Image */}
      <div className="w-[60px] h-[60px] md:w-[69px] md:h-[69px] rounded-full overflow-hidden flex-shrink-0">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-[4px]">
        <span className="text-[20px] text-[#181717] font-bold">{name}</span>
        {/* text color is text-[#414651] */}
        <span className="text-[15px]  font-semibold text-green-500">
          {isOnline ? "online" : formatLastSeen(lastSeenTimestamp)}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
