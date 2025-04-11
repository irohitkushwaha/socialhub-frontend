import React from 'react';

const ButtonVideo = ({ icon = "north_east", className, text = "Upload", ...props }) => {
  return (
    <button 
      {...props}
      className={`relative flex items-center gap-[8px] px-[10px] lg:px-[16px] py-[10px] rounded-[8px] border border-[#D5D7DA] shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] cursor-pointer ${className}`}
    >
      <span 
        className="material-symbols-outlined text-green-600"
        style={{ 
          fontSize: '20px',
          fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
        }}
      >
        {icon}
      </span>
      <span className="text-[15px] font-Inter font-semibold text-[#414651]">
        {text}
      </span>
    </button>
  );
};

export default ButtonVideo;
