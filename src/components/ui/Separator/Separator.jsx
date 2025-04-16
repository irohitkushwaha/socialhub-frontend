import React from "react";

const Separator = () => {
  return (
    <div className="flex items-center w-[329px] md:w-[360px] gap-[8px] mx-auto">
      <div className="h-[1px] bg-[#E9EAEB] flex-grow"></div>
      <span className="text-[14px] font-normal text-[#717680]">OR</span>
      <div className="h-[1px] bg-[#E9EAEB] flex-grow"></div>
    </div>
  );
};

export default Separator;