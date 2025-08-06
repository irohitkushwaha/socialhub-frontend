import { io } from "socket.io-client";
import {
  receiveMessage,
  updateMessageStatus,
  setUserTyping,
  updateUserStatus,
} from "../../redux/slices/chatSlice";
import { store } from "../../redux/store";

console.log(
  "Cookie info for debugging - has cookies:",
  document.cookie ? "Yes" : "No"
);

const getSocketUrl = () => {

  return "https://api-socialhub.rohitkushwaha.com/"; 
};


// Create socket connection
const socket = io(getSocketUrl(), {
  transports: ["websocket"], // Force WebSocket as the transport
  path: "/socket.io/", // Match the path specified in your server
  withCredentials: true, // This is critical for sending cookies with the request
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  extraHeaders: {
    "x-client-version": "1.0.0",
  },
});

// Event handlers for connection
socket.on("connect", () => {
  console.log("Socket connected successfully! in client side", socket.id);

  //Get all users list for chatting
  // socket.on("All_Users_List", (UsersList) => {
  //   console.log("the list of all user is", UsersList);
  // });

  //received the all user status update online/last seen
  socket.on("Users_Status_Update", (data) => {
    console.log("data coming of user status update");

    const { Online, OfflineAndLastSeen } = data;

    console.log("Online Users:", Online);
    console.log("Offline Users (Last Seen):", OfflineAndLastSeen);

    store.dispatch(
      updateUserStatus({
        onlineUsers: Online,
        lastSeenUsers: OfflineAndLastSeen,
      })
    );
  });

  //Getting Typing indicator that someone is typing to send message to me

  socket.on("Typing_Status", (typingData) => {
    const { senderId, isTyping } = typingData;

    console.log(
      `User ${senderId} is ${isTyping ? "typing..." : "stopped typing"}`
    );

    store.dispatch(setUserTyping({ senderId, isTyping }));
  });

  //Getting Confirmation that Message has been delivered to Receiver - Double tick
  socket.on("Message_Delivered_To_Receiver", (deliveryData) => {
    const { tempId, messageId, status } = deliveryData;
    console.log(
      `Message ${tempId} delivered with ID ${messageId} and status: ${status}`
    );
    store.dispatch(updateMessageStatus({ tempId, messageId, status }));
    // Update UI state here
  });

  //Getting Confirmation that Message has been Read by the Receiver - Blue Double Tick
  socket.on("Message_Read_By_Receiver", (readData) => {
    console.log("message read by receiver just readData", readData);
    const { messageId, status } = readData;

    console.log(`Message ${messageId} was read by user with status: ${status}`);
    store.dispatch(updateMessageStatus({ messageId, status }));

    // Here you would typically update your UI or state management
    // For example, update message read status in your Redux store or local state
    // dispatch(updateMessageReadStatus({ messageId, receiverId, status }));
  });

  //Receiving Message sent from the sender
  socket.on("Receiving_Message_From_Sender", (ReceivedMessage) => {
    console.log(
      `message sent to me from sender ${ReceivedMessage.MessageText}`
    );
    store.dispatch(receiveMessage({ message: ReceivedMessage }));
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
export const sendMessageReadConfirmation = (MessageId, OriginalSenderId) => {
  console.log("message read by receiver socket", MessageId, OriginalSenderId);

  socket.emit("Message_Read_By_Receiver", { MessageId, OriginalSenderId });
};

// Export socket for use in components
export default socket;
