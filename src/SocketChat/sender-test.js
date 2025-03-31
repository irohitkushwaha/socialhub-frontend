import { io } from "socket.io-client";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdiNzA1Y2RjNzI5ZmJmZDRmNzIzNWYiLCJVc2VybmFtZSI6IjFzeXN0ZW0iLCJGdWxsTmFtZSI6InN5c3RlbUBzeXN0ZW0uY29tIiwiRW1haWwiOiIxc3lzdGVtQHN5c3RlbS5jb20iLCJpYXQiOjE3MzY3NDQ2MjMsImV4cCI6MTczNjgzMTAyM30.Y0y_1Y0F6fb74UYnqocEtLGxclbfqc38YUFChfELwwg"; // Use the JWT token you obtained from login

const socket = io("http://localhost:8000", {
  extraHeaders: {
    cookie: `accessToken=${token}`,
  },
  transports: ["websocket"], // Force WebSocket as the transport
});

// socket.on("connection", () => {
//   console.log("Socket connected successfully! in client side");

socket.on("connect", () => {
  console.log("Socket connected successfully! in client side");

  socket.on("users_status_update", (data) => {
    const { Online, offlineAndLastSeen } = data;

    console.log("Online Users:", Online);
    console.log("Offline Users (Last Seen):", offlineAndLastSeen);
  });

  // Test sending a message
  const messageData = {
    receiver: "677a2c9f775ee2ca043c228e", // rohit
    sender: "677b705cdc729fbfd4f7235f", //system
    MessageFileUrl : "cheking undelivered msg function working or not",
    MessageType: "Image", // or "image", etc.
    // MessageText: "hii rohit i have made interesting for you",
    MessageStatus: "sent",
    TimeStamps: new Date().toISOString(),
  };

  // Simulate sending message
  socket.emit("send_message", messageData);

  socket.on("send_message", (msg) => {
    console.log("Message received by receiver:", msg);
  });

  socket.on("deliveredmsg", (status) => {
    console.log(status); // e.g., "message has been delivered"
  });

  socket.on("readMessage", (status) => {
    console.log("Read status:", status); // e.g., "message read"
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
