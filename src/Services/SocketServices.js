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
  socket.on("all_users_list", (UsersList) => {
    console.log("the list of all user is", UsersList);
  });

  //received the all user status update online/last seen
  socket.on("users_status_update", (data) => {
    const { Online, offlineAndLastSeen } = data;

    console.log("Online Users:", Online);
    console.log("Offline Users (Last Seen):", offlineAndLastSeen);
  });

  //Sending the message Data

  socket.emit("send_message", messageData);

  //Getting Confirmation that Message has been delivered to Receiver - Double tick
  socket.on("Message_Develivered_to_Receiver", (MessageStatus) => {
    console.log(MessageStatus); // e.g., "message has been delivered to the receiver"
  });

  //Getting Confirmation that Message has been Read by the Receiver - Blue Double Tick
  socket.on("Message_Read_By_Receiver", (MessageStatus) => {
    console.log("Read status:", MessageStatus); // e.g., "message read"
  });

  //Receiving Message sent from the sender
  socket.on("receiving_message_from_sender", (ReceivedMessage) => {
    console.log(
      `message sent to me from sender ${ReceivedMessage.MessageFileUrl}`
    );
  });

  //Sending Confirmation that "I" Receiver has been read the message sent by sender

  socket.emit("Message_Read_By_Receiver", "Read");
});

// Handle connection errors
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

// Export socket for use in components
export default socket;
