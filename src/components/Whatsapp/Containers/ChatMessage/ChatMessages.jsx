import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "../../Components/MessageBubble";
import ChatDateSeparator from "../../Components/ChatDateSeparator";
import { formatMessageTime } from "../../utils/chatAdapter";
import "../../../../Pages/Whatsapp/Whatsapp.css";
import { selectIsUserTyping } from "../../../../redux/slices/chatSlice";
import { selectChatData } from "../../../../redux/slices/sidebarChatSlice";
import { useSelector } from "react-redux";
// import WavyText from "../../../ui/WavyText";
import TypewriterEffect from "../../../../utils/typewritereffect";

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [visibleDate, setVisibleDate] = useState(null);

  const selectedChat = useSelector(selectChatData);
  const isTyping = useSelector((state) =>
    selectIsUserTyping(state, selectedChat?.id)
  );

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

  useEffect(() => {
    if (isTyping) {
      scrollToBottom();
    }
  }, [isTyping]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full p-4 overflow-y-auto bg-[#ffffff] px-[10%] thin-scrollbar"
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
              message={msg.text}
              timestamp={formatMessageTime(msg.timestamp)}
              isSent={msg.isSent}
              // profileImage={!msg.isSent ? msg.profileImage : null}
              status={msg.status}
            />
          </div>
        ))}
      </div>
      {isTyping && selectedChat && (
        <div className="flex justify-start mb-4 ml-3">
          <div className="p-3 flex items-center space-x-1">
            <div className="flex space-x-1">
              <div
                className="h-2 w-2 bg-gray-300 rounded-full custom-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="h-2 w-2 bg-gray-300 rounded-full custom-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="h-2 w-2 bg-gray-300 rounded-full custom-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <style jsx>{`
              @keyframes custom-bounce {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-5px); /* Increased bounce height */
                }
              }
              .custom-bounce {
                animation: custom-bounce 1s infinite ease-in-out;
              }
            `}</style>
          </div>
        </div>
      )}

      <div ref={messagesEndRef}></div>
      {/* <div ref={messagesEndRef} </div > */}
    </div>
  );
};

export default ChatMessages;
