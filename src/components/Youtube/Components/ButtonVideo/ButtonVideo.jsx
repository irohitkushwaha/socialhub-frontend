import React from 'react';

const ButtonVideo = ({ icon, className, text = "Upload", ...props }) => {
  return (
    <button 
      {...props}
      className={`relative flex items-center gap-[8px] px-[10px] lg:px-[16px] py-[10px] rounded-[8px] border border-[#D5D7DA] shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] cursor-pointer ${className}`}
    >
      <div className="w-[20px] h-[20px] flex-shrink-0">
        {icon}
      </div>
      <span className="text-[15px] font-Inter font-semibold text-[#414651]">
        {text}
      </span>
    </button>
  );
};

export default ButtonVideo;
