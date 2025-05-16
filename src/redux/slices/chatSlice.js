// src/redux/slices/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Messages state
  messages: {}, // Organized by chat ID: { "userId1": [message1, message2], "userId2": [message1] }

  // Online status
  onlineUsers: [], // Array of online user IDs
  lastSeenUsers: {}, // userId -> timestamp

  // Typing indicators
  typingUsers: {}, // { userId: isTyping }

  // Pending messages (not delivered yet)
  pendingMessages: [], // Messages waiting to be delivered
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Message-related actions
    receiveMessage: (state, action) => {
      const { message } = action.payload;
      const chatId = message.SenderId;

      // Initialize chat array if needed
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      // Add message to the correct chat
      state.messages[chatId].push({
        id: message._id,
        tempId: message.TempMsgId,
        text: message.MessageText,
        timestamp: message.TimeStamps,
        isSent: false, // Received message
        status: message.MessageStatus,
        senderId: message.SenderId,
        receiverId: message.ReceiverId,
        messageType: message.MessageType,
        fileUrl: message.MessageFileUrl,
      });
    },

    sendMessageSlice: (state, action) => {
      const { message } = action.payload;
      const chatId = message.ReceiverId;

      // Initialize chat array if needed
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      // Add message to the correct chat
      state.messages[chatId].push({
        tempId: message.TempMsgId,
        text: message.MessageText,
        timestamp: message.TimeStamps,
        isSent: true, // Sent message
        status: "sent",
        senderId: message.SenderId,
        receiverId: message.ReceiverId,
        messageType: message.MessageType,
        fileUrl: message.MessageFileUrl,
      });
    },

    // Update status for a specific message
    updateMessageStatus: (state, action) => {
      const { tempId, messageId, status } = action.payload;
      console.log(
        "in the slice the temp , messageid and status",
        tempId,
        messageId,
        status
      );

      // Search through all chats for the message
      Object.keys(state.messages).forEach((chatId) => {
        const messages = state.messages[chatId];

        console.log("inside the object keys messages value is", messages);

        let messageIndex;

        if (tempId) {
          messageIndex = messages.findIndex((msg) => msg.tempId === tempId);
          console.log("value of messageindex inside if tempid", messageIndex);
        }

        if (!tempId && messageId) {
          messageIndex = messages.findIndex((msg) => msg.id === messageId);
          console.log(
            "value of messageindex inside if messageid",
            messageIndex
          );
        }

        console.log("value of message index is", messageIndex);

        if (messageIndex !== -1) {
          // Update message status
          console.log(
            "value of exiting message status is",
            messages[messageIndex].status
          );

          messages[messageIndex].status = status;
          // If we have a messageId and the message only had a tempId before
          if (messageId && !messages[messageIndex].id) {
            messages[messageIndex].id = messageId;
          }
        } else {
          console.warn(
            `Message not found for tempId: ${tempId} or messageId: ${messageId}`
          );
          console.log(
            `Message not found for tempId: ${tempId} or messageId: ${messageId}`
          );
        }
      });
    },

    // Online status actions
    updateUserStatus: (state, action) => {
      const { onlineUsers, lastSeenUsers } = action.payload;
      state.onlineUsers = onlineUsers;
      state.lastSeenUsers = lastSeenUsers;
    },

    // Typing indicator actions
    setUserTyping: (state, action) => {
      const { senderId, isTyping } = action.payload;
      state.typingUsers[senderId] = isTyping;
    },

    // Initialize chat history
    setChatHistory: (state, action) => {
      const { messages, otherUserId } = action.payload;

      // Transform messages to match our format
      const formattedMessages = messages.map((msg) => ({
        id: msg._id,
        tempId: msg.TempMsgId,
        text: msg.MessageText,
        timestamp: msg.TimeStamps,
        isSent: msg.SenderId !== otherUserId,
        status: msg.MessageStatus,
        senderId: msg.SenderId,
        receiverId: msg.ReceiverId,
        messageType: msg.MessageType,
        fileUrl: msg.MessageFileUrl,
      }));

      // Set messages for this chat
      state.messages[otherUserId] = formattedMessages;
    },

    // Clear all messages (for logout)
    clearAllMessages: (state) => {
      state.messages = {};
      state.messageStatus = {};
      state.pendingMessages = [];
    },
  },
});

// Action creators
export const {
  receiveMessage,
  sendMessageSlice,
  updateMessageStatus,
  updateUserStatus,
  setUserTyping,
  setChatHistory,
  clearAllMessages,
} = chatSlice.actions;

// Selectors
export const selectChatMessages = (state, chatId) =>
  state.chat.messages[chatId] || [];

export const selectOnlineUsers = (state) => state.chat.onlineUsers;

export const selectlastSeenUsers = (state) => state.chat.lastSeenUsers;

export const selectIsUserTyping = (state, userId) =>
  !!state.chat.typingUsers[userId];

export const selectIsUserOnline = (state, userId) => {
  const onlineUsers = state.chat.onlineUsers;
  return Array.isArray(onlineUsers) && userId
    ? onlineUsers.includes(userId)
    : false;
};

export default chatSlice.reducer;
