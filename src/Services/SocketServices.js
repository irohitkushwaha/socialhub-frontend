// src/services/socketService.js

import { io } from "socket.io-client";

// Create socket connection
const socket = io("http://localhost:8000", {
  transports: ["websocket"], // Force WebSocket as the transport
});

// Event handlers for connection
socket.on("connect", () => {
  console.log("Socket connected successfully! in client side");

  //Get all users list for chatting
  // socket.on("All_Users_List", (UsersList) => {
  //   console.log("the list of all user is", UsersList);
  // });

  //received the all user status update online/last seen
  socket.on("Users_Status_Update", (data) => {
    const { Online, offlineAndLastSeen } = data;

    console.log("Online Users:", Online);
    console.log("Offline Users (Last Seen):", offlineAndLastSeen);
  });

  //Getting Typing indicator that someone is typing to send message to me

  socket.on("Typing_Status", (typingData) => {
    const { senderId, isTyping } = typingData;

    console.log(
      `User ${senderId} is ${isTyping ? "typing..." : "stopped typing"}`
    );
  });

  //Getting Confirmation that Message has been delivered to Receiver - Double tick
  socket.on("Message_Delivered_To_Receiver", (deliveryData) => {
    const { tempId, messageId, status } = deliveryData;
    console.log(
      `Message ${tempId} delivered with ID ${messageId} and status: ${status}`
    );
    // Update UI state here
  });

  //Getting Confirmation that Message has been Read by the Receiver - Blue Double Tick
  socket.on("Message_Read_By_Receiver", (readData) => {
    const { messageId, receiverId, status } = readData;
    console.log(
      `Message ${messageId} was read by user ${receiverId} with status: ${status}`
    );

    // Here you would typically update your UI or state management
    // For example, update message read status in your Redux store or local state
    // dispatch(updateMessageReadStatus({ messageId, receiverId, status }));
  });

  //Receiving Message sent from the sender
  socket.on("Receiving_Message_From_Sender", (ReceivedMessage) => {
    console.log(
      `message sent to me from sender ${ReceivedMessage.MessageFileUrl}`
    );
  });
});

// Handle connection errors
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

// Add reconnection handler here
socket.io.on("reconnect", () => {
  console.log("Socket reconnected");
  // Re-register event handlers if needed
});

//Sending the Typing Status to the Receiver
export const sendTypingStatus = (receiverId, isTyping) => {
  socket.emit("Typing_Status", {
    receiverId,
    isTyping,
  });
};

//Sending the message Data
export const sendMessage = (messageData) => {
  // Check if socket is connected before sending
  if (!socket.connected) {
    console.error("Socket disconnected, can't send message");

    // Return failure status
    return {
      success: false,
      error: "disconnected",
    };
  }

  // If connected, proceed with sending
  socket.emit("Send_Message", messageData);

  // Return success
  return {
    success: true,
  };
};

//Sending Confirmation that "I" Receiver has been read the message sent by sender
export const sendMessageReadConfirmation = (messageId, originalSenderId) => {
  socket.emit("Message_Read_By_Receiver", { messageId, originalSenderId });
};

// Export socket for use in components
export default socket;
