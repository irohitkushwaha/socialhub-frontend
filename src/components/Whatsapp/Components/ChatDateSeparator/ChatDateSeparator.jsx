import React from "react";
import { formatChatDate } from "../../utils/chatAdapter";

const ChatDateSeparator = ({ date }) => {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="px-4 py-1 bg-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
        {formatChatDate(date)}
      </div>
    </div>
  );
};

export default ChatDateSeparator;
