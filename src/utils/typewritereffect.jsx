import React, { useState, useEffect } from "react";

const TypewriterEffect = ({
  text = "",
  typingSpeed = 100,
  erasingSpeed = 70,
  pauseBeforeErasing = 600,
  pauseBeforeTyping = 200,
  willErase = true,
  loop = true,
  className = "",
  onComplete = () => {},
  onTextUpdate = null // Add this callback
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (isTyping) {
      // Typing forward
      if (index < text.length) {
        timer = setTimeout(() => {
          const newText = text.substring(0, index + 1);
          setDisplayText(newText);
          // Call onTextUpdate if provided
          if (onTextUpdate) onTextUpdate(newText);
          setIndex(index + 1);
        }, typingSpeed);
      } else {
        // Pause at the end
        timer = setTimeout(() => {
          if (willErase) {
            setIsTyping(false);
          } else if (loop) {
            // If not erasing but looping, reset to start again
            setIndex(0);
            setDisplayText("");
            if (onTextUpdate) onTextUpdate("");
          } else {
            // Not erasing, not looping, just complete
            onComplete();
          }
        }, pauseBeforeErasing);
      }
    } else {
      // Erasing (only if willErase is true)
      if (index > 0) {
        timer = setTimeout(() => {
          const newText = text.substring(0, index - 1);
          setDisplayText(newText);
          if (onTextUpdate) onTextUpdate(newText);
          setIndex(index - 1);
        }, erasingSpeed);
      } else {
        // Pause before typing again
        timer = setTimeout(() => {
          setIsTyping(true);
        }, pauseBeforeTyping);
      }
    }

    return () => clearTimeout(timer);
  }, [text, index, isTyping, typingSpeed, erasingSpeed, pauseBeforeErasing, pauseBeforeTyping, willErase, loop, onComplete, onTextUpdate]);

  return <span className={className}>{displayText}</span>;
};

export default TypewriterEffect;