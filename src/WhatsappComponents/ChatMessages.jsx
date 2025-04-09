import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatDateSeparator from "./ChatDateSeparator";
import { formatMessageTime } from "./chatAdapter";

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [visibleDate, setVisibleDate] = useState(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      // First phase: Smooth scroll for visual appeal
      containerRef.current.style.scrollBehavior = "smooth";
      containerRef.current.scrollTop = containerRef.current.scrollHeight;

      // Second phase: Ensure we reach the absolute end point with precision
      setTimeout(() => {
        // Temporarily disable smooth scrolling to ensure precision
        containerRef.current.style.scrollBehavior = "auto";
        containerRef.current.scrollTop = containerRef.current.scrollHeight;

        // Reset to smooth for future scrolling
        setTimeout(() => {
          containerRef.current.style.scrollBehavior = "smooth";
        }, 50);
      }, 500);
    }
  };

  useEffect(() => {
    scrollToBottom();
    // Set initial visible date
    if (messages.length > 0) {
      setVisibleDate(
        messages[messages.length - 1].timestamp ||
          messages[messages.length - 1].TimeStamps
      );
    }
  }, [messages]);

  const handleScroll = (e) => {
    const container = e.target;
    const messageElements = container.querySelectorAll(".message-container");
  
    if (messageElements.length === 0) return;
  
    // Get container's position
    const containerRect = container.getBoundingClientRect();
  
    // Find the first visible message
    for (let i = 0; i < messageElements.length; i++) {
      const rect = messageElements[i].getBoundingClientRect();
  
      // Calculate position relative to container
      const relativeTop = rect.top - containerRect.top;
  
      // Check if message is visible in the container
      if (relativeTop >= 0 && relativeTop < container.clientHeight) {
        const timestamp = messageElements[i].dataset.timestamp;
        if (timestamp) {
          setVisibleDate(timestamp);
        }
        // break;  // <-- This stops after finding the first visible message
      }
    }
  };
  // const handleScroll = (e) => {
  //   const container = e.target;
  //   const messageElements = container.querySelectorAll(".message-container");

  //   if (messageElements.length === 0) return;

  //   // Get container's position
  //   const containerRect = container.getBoundingClientRect();

  //   // Find the last visible message (first visible from bottom)
  //   let lastVisibleMessageTimestamp = null;

  //   // Iterate through all messages to find the last one visible
  //   for (let i = 0; i < messageElements.length; i++) {
  //     const rect = messageElements[i].getBoundingClientRect();

  //     // Calculate position relative to container
  //     const relativeTop = rect.top - containerRect.top;                                                    
  //     const relativeBottom = relativeTop + rect.height;

  //     // Check if message is visible in the container
  //     if (relativeTop < container.clientHeight && relativeBottom > 0) {
  //       // This message is visible, store its timestamp
  //       const timestamp = messageElements[i].dataset.timestamp;
  //       if (timestamp) {
  //         lastVisibleMessageTimestamp = timestamp;
  //       }
  //     }
  //   }

  //   // Update the visible date with the last visible message's timestamp
  //   if (lastVisibleMessageTimestamp) {
  //     setVisibleDate(lastVisibleMessageTimestamp);
  //   }
  // };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full p-4 overflow-y-auto bg-[#ffffff]"
      onScroll={handleScroll}
    >
      {/* Date display at the top */}
      {visibleDate && (
        <div className="sticky top-0 z-10 flex justify-center">
          <ChatDateSeparator date={visibleDate} />
        </div>
      )}

      {/* Messages container with custom background */}
      <div className="flex-1 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message-container"
            data-timestamp={msg.timestamp || msg.TimeStamps}
          >
            <MessageBubble
              message={msg.text || msg.MessageText}
              timestamp={formatMessageTime(msg.timestamp || msg.TimeStamps)}
              isSent={msg.isSent || msg.SenderId === "currentUserId"}
              profileImage={!msg.isSent ? msg.profileImage : null}
              status={msg.status || msg.MessageStatus}
            />
          </div>
        ))}
      </div>
      <div ref={messagesEndRef}></div>
      {/* <div ref={messagesEndRef} </div > */}
    </div>
  );
};

export default ChatMessages;
