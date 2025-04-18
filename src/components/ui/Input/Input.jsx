import React from "react";

const Input = ({ label, placeholder, helpText, isMandatory = false }) => {
  return (
    //md:w-[360px]
    <div className="w-full px-[10px]  flex flex-col gap-[15px] md:gap-[11px]">
      <div className="flex items-center gap-1">
        <label className="text-[16px] font-medium text-[#414651]">
          {label}
        </label>
        {isMandatory && (
          <span className="text-[16px] font-medium text-[#414651]">*</span>
        )}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-[15px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] text-[18px] md:text-[20px] font-semibold leading-6 text-[#717680] placeholder-[#717680] focus:outline-none focus:border-[#D5D7DA]"
      />
      {helpText && (
        <p className="text-[16px] font-normal text-[#535862]">{helpText}</p>
      )}
    </div>
  );
};

export default Input;
