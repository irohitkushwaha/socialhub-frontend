import React, { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatDemo = () => {
  // Sample messages data with initial messages (ordered from newest to oldest)
  const [messages, setMessages] = useState([
    // Today's messages
    {
      text: "Thanks! Can't wait to show you the final version",
      timestamp: "2025-04-01T09:15:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "That's fantastic news!",
      timestamp: "2025-04-01T09:10:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    // 9 days ago
    {
      text: "It's almost done! Just adding some final touches",
      timestamp: "2025-04-02T10:25:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "Yes, of course! How's it going?",
      timestamp: "2025-04-02T10:20:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "Hey, remember that chat app we were working on?",
      timestamp: "2025-04-02T10:15:00.000Z",
      isSent: true,
      status: "read",
    },
    // 8 days ago
    {
      text: "That's good to hear! Better to catch them now",
      timestamp: "2025-04-03T11:35:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "Going well! Found and fixed a few minor issues",
      timestamp: "2025-04-03T11:30:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "How's the final testing going?",
      timestamp: "2025-04-03T11:25:00.000Z",
      isSent: true,
      status: "read",
    },
    // 7 days ago
    {
      text: "Perfect! Can't wait to see it go live",
      timestamp: "2025-04-04T14:15:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "Yes, everything is set! Just doing final testing",
      timestamp: "2025-04-04T14:10:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "Are you ready for the launch tomorrow?",
      timestamp: "2025-04-04T14:05:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    // 6 days ago
    {
      text: "Thanks! The date display feature works perfectly",
      timestamp: "2025-04-05T09:35:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "Wow, it looks fantastic! Great job!",
      timestamp: "2025-04-05T09:30:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "The app is now live! Check it out!",
      timestamp: "2025-04-05T09:25:00.000Z",
      isSent: true,
      status: "read",
    },
    // 5 days ago
    {
      text: "Great! Looking forward to it",
      timestamp: "2025-04-06T16:15:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    // 4 days ago
    {
      text: "Probably by next week",
      timestamp: "2025-04-06T18:25:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "When will you finish the project?",
      timestamp: "2025-04-06T18:20:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    // 3 days ago
    {
      text: "Yes, it looks amazing!",
      timestamp: "2025-04-07T09:45:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "Did you see the new design?",
      timestamp: "2025-04-07T09:40:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    // 2 days ago
    {
      text: "That's great! Keep up the good work!",
      timestamp: "2025-04-07T15:35:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "Making good progress! Just added the date display feature.",
      timestamp: "2025-04-07T15:30:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "How's the progress going?",
      timestamp: "2025-04-07T15:25:00.000Z",
      isSent: true,
      status: "read",
    },
    // Yesterday's messages
    {
      text: "That's awesome! Can't wait to see it in action.",
      timestamp: "2025-04-07T20:15:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "It includes message bubbles that look different for sent and received messages.",
      timestamp: "2025-04-07T20:10:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "Sure! I'm building a WhatsApp-style chat interface with React.",
      timestamp: "2025-04-07T20:05:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    // Today's messages
    {
      text: "That sounds great! Can you tell me more about it?",
      timestamp: "2025-04-08T10:25:00.000Z",
      isSent: true,
      status: "read",
    },
    {
      text: "I'm good, thanks! Just working on some new features.",
      timestamp: "2025-04-08T10:20:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "Morning! How are you?",
      timestamp: "2025-04-08T10:15:00.000Z",
      isSent: true,
      status: "delivered",
    },
    {
      text: "Good morning!",
      timestamp: "2025-04-08T10:10:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "Good Evening!",
      timestamp: "2025-04-09T12:10:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "Kaise Ho",
      timestamp: "2025-04-09T12:30:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "Fine how are you",
      timestamp: "2025-04-09T12:33:00.000Z",
      isSent: false,
      profileImage: "https://i.pravatar.cc/150?img=1",
    },
  ]);

  // Handler for sending a new message
  const handleSendMessage = (text) => {
    // Get current time as ISO string
    const now = new Date();

    // Create new message object
    const newMessage = {
      text,
      timestamp: now.toISOString(),
      isSent: true,
      status: "sent", // Initial status
    };

    // Add message to state
    setMessages([...messages, newMessage]);
  };

  // Handlers for image and document selection
  const handleImageSelect = () => {
    alert("Image upload functionality will be implemented here");
  };

  const handleDocumentSelect = () => {
    alert("Document upload functionality will be implemented here");
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-300 shadow-lg">
      {/* Chat header */}
      <ChatHeader
        name="John Doe"
        status="Online"
        profileImage="https://i.pravatar.cc/150?img=1"
      />

      {/* Messages area */}
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} />
      </div>

      {/* Message input */}
      <div className="p-3 bg-[#ffffff] border-t">
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
