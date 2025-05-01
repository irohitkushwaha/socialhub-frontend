import React from "react";

const ActionButton = ({ icon, text = "View Profile" }) => {
  return (
    <div className="w-full flex items-center  py-[6px] rounded-[6px]  px-[8px] gap-[14px] cursor-pointer hover:bg-gray-100">
      <div>{icon}</div>
      <span className="text-[18px] font-medium text-[#414651]">{text}</span>
    </div>
  );
};

export default ActionButton;
