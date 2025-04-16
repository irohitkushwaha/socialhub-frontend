import React from "react";
import googleIcon from "../../../assets/google.webp";

const GoogleButton = () => {
  return (
    <button 
      className="w-full md:w-[360px] px-[14px] md:px-[16px] py-[10px] flex items-center justify-center gap-[12px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] cursor-pointer"
    >
      <img src={googleIcon} alt="Google" className="w-[33px] h-[33px]" />
      <span className="text-[18px] md:text-[20px] font-semibold leading-6 text-[#414651]">
        Continue with Google
      </span>
    </button>
  );
};

export default GoogleButton; 