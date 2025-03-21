import React, { useState } from "react";

const Toggle = ({ label = "", initialState = false, onChange }) => {
  const [isActive, setIsActive] = useState(initialState);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleToggle}
        className={`relative w-[36px] h-[20px] rounded-[12px] p-[2px] transition-colors duration-300 ${
          isActive ? "bg-[#7F56D9]" : "bg-gray-300"
        } cursor-pointer`}
        aria-pressed={isActive}
      >
        <span
          className={`block w-[16px] h-[16px] bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
            isActive ? "translate-x-[16px]" : "translate-x-0"
          }`}
        />
      </button>
      {label && (
        <span className="text-[14px] font-medium text-[#414651]">{label}</span>
      )}
    </div>
  );
};

export default Toggle;
