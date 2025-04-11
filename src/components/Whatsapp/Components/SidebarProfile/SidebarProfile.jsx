import React, { useState } from "react";
import shradha from "../assets/shradha.jpg";


const SidebarChat = () => {

  const [isSelected, setIsSelected] = useState(false);



  

const handleChatSelect = () => {
  setIsSelected(!isSelected);
}

  return (
    <div
      className={`w-full md:w-fit px-[12px] md:px-[20px] py-3 flex justify-start items-start
        gap-[13px] cursor-pointer rounded-[6px] ${isSelected ? "bg-[#F0F0F0]" : ""}`}     
      onClick={handleChatSelect}
    >
      {/* Profile Image */}
      <div className="w-[59px] h-[59px] rounded-full overflow-hidden flex-shrink-0">
        <img
          src={shradha}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-[4px]">
        <span className="text-[18px] text-[#181717] font-bold">Shradha Khapra</span>
        <span className="text-[15px] text-[#414651] font-semibold">shradhakhapra@gmail.com</span>
      </div>
    </div>
  );
};

export default SidebarChat;
