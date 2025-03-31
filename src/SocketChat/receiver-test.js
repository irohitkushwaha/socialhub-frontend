import { io } from "socket.io-client";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdhMmM5Zjc3NWVlMmNhMDQzYzIyOGUiLCJVc2VybmFtZSI6InJvaGl0MSIsIkZ1bGxOYW1lIjoicm9oaXQxIiwiRW1haWwiOiJyb2hpdDFAcm9oaXQxLmNvbSIsImlhdCI6MTczNjc0NDkwNiwiZXhwIjoxNzM2ODMxMzA2fQ.nlLSCATNrlcI94emXZJphsbmjhBbc8rsUXT7jWrHIrg"; // Use the JWT token you obtained from login

const socket = io("http://localhost:8000", {
  extraHeaders: {
    cookie: `accessToken=${token}`,
  },
  transports: ["websocket"], // Force WebSocket as the transport
});

socket.on("connect", () => {
  console.log("Socket connected successfully! in client side");

  socket.on("users_status_update", (data) => {
    const { Online, offlineAndLastSeen } = data;

    console.log("Online Users:", Online);
    console.log("Offline Users (Last Seen):", offlineAndLastSeen);
  });

  socket.on("send_message", (message) => {
    console.log(`message sent to me from sender ${message.MessageFileUrl}`);
  });

  socket.emit("read_message", "i am receiver and i have read message");
});

// Handle connection errors
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
