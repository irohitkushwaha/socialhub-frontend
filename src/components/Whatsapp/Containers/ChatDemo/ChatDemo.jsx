import React, { useState, useEffect } from "react";
import ChatMessages from "../ChatMessage";
import ChatHeader from "../../Components/ChatHeader";
import MessageInput from "../../Components/MessageInput";
import { useSelector } from "react-redux";
import {
  selectChat,
  selectChatData,
} from "../../../../redux/slices/sidebarChatSlice";
import { sendMessage } from "../../../../Services/socket/SocketServices";
import { getUserData } from "../../../../redux/slices/authentication.slice";
import { selectChatMessages } from "../../../../redux/slices/chatSlice";
import { useDispatch } from "react-redux";
import {
  sendMessageSlice,
  updateMessageStatus,
  setChatHistory,
} from "../../../../redux/slices/chatSlice";
import { sendMessageReadConfirmation } from "../../../../Services/socket/SocketServices";
import { chatService } from "../../../../Services/api/Chat.Service";

const ChatDemo = () => {
  const selectedChat = useSelector(selectChatData);
  const dispatch = useDispatch();

  const loggeduserid = useSelector(getUserData);
  // Sample messages data with initial messages (ordered from newest to oldest)

  const messages = useSelector((state) =>
    selectChatMessages(state, selectedChat?.id)
  );

  const [loadedChatHistories, setLoadedChatHistories] = useState({});

  // Fetch chat history when selectedChat changes
  useEffect(() => {
    if (selectedChat?.id && !loadedChatHistories[selectedChat.id]) {
      chatService
        .getChatHistory(selectedChat.id)
        .then((response) => {
          dispatch(
            setChatHistory({
              messages: response,
              otherUserId: selectedChat.id,
            })
          );
          setLoadedChatHistories((prev) => ({
            ...prev,
            [selectedChat.id]: true, // Mark this chat's history as loaded
          }));
        })
        .catch((error) => {
          console.error("Error fetching chat history:", error);
        });
    }
  }, [selectedChat, dispatch, loadedChatHistories]);

  // Handler for sending a new message
  const handleSendMessage = (text) => {
    // Get current time as ISO string
    const now = new Date();
    const tempId = Date.now().toString();

    // Add message to state

    console.log("value of selectedchat is", selectedChat);

    // Create message object in the format expected by the server
    const messageForServer = {
      TempMsgId: tempId,
      ReceiverId: selectedChat?.id, // ID of the chat
      SenderId: loggeduserid?.id,
      MessageType: "text",
      MessageFileUrl: null, // No file for text messages
      MessageStatus: "sent",
      TimeStamps: now.toISOString(),
      MessageText: text,
    };
    console.log("msg sent", messageForServer);

    dispatch(sendMessageSlice({ message: messageForServer }));

    // Send the properly formatted message to the server

    sendMessage(messageForServer);
  };

  // Handlers for image and document selection
  const handleImageSelect = () => {
    alert("Image upload functionality will be implemented here");
  };

  const handleDocumentSelect = () => {
    alert("Document upload functionality will be implemented here");
  };

  useEffect(() => {
    if (selectedChat?.id && messages.length > 0) {
      console.log("confirmation runned");
      // Find all unread messages received from the selected chat
      const unreadMessages = messages.filter(
        (message) =>
          !message.isSent && // Only process received messages
          message.status !== "read" && // That aren't already read
          message.id // That have a database ID (not just tempId)
      );

      console.log("unread messages are", unreadMessages);
      // Mark each unread message as read
      unreadMessages.forEach((message) => {
        sendMessageReadConfirmation(
          message.id,
          message.senderId // This is the original sender (the user we're chatting with)
        );

        console.log(
          `Marking message as read: ${message.id} from ${message.senderId}`
        );

        dispatch(
          updateMessageStatus({
            tempId: message.tempId,
            messageId: message.id,
            status: "read",
          })
        );
      });
    }
  }, [selectedChat, messages]);

  return (
    <div className="flex flex-col h-full w-full rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]">
      {/* Chat header */}
      <div className="w-full px-[10px] pt-[10px] pb-0.5">
        <ChatHeader
          name={selectedChat.name}
          status="online"
          profileImage={selectedChat.profileImage}
        />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} />
      </div>

      {/* Message input */}
      <div className="p-3">
        <MessageInput
          onMessageSend={handleSendMessage}
          onImageSelect={handleImageSelect}
          onDocumentSelect={handleDocumentSelect}
        />
      </div>
    </div>
  );
};

export default ChatDemo;
