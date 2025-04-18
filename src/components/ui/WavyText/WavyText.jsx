// WavyText.jsx
import React from 'react';

const WavyText = ({ text, color = "inherit" }) => {
  return (
    <>
      <style>
        {`
          @keyframes wave {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-16px);
            }
          }
          .wavy-char {
            display: inline-block;
            animation: wave 2s ease-in-out infinite;
          }
        `}
      </style>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="wavy-char" 
          style={{ 
            animationDelay: `${index * 0.05}s`,
            color
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
};

export default WavyText;