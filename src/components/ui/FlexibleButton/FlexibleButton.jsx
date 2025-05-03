import React from "react";

const FlexibleButton = ({
  text = "Button Text",
  img,
  width = "w-full md:w-[360px]",
  padding = "px-[14px] md:px-[16px] py-[10px]",
  gap = "gap-[12px]",
  textSize = "text-[18px] md:text-[20px]",
  textColor = "text-[#414651]",
  bgColor = "bg-green-500",
  className = "",
  onClick,
  type = "submit"
}) => {
  // Base classes that will always be applied
  const baseClasses =
    "flex items-center justify-center rounded-[8px] border border-[#D5D7DA]  shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] cursor-pointer";

  // Combine all classes with overrides taking precedence
  const buttonClasses = `${width} ${padding} ${gap} ${baseClasses} ${className} ${bgColor}`;
  const textClasses = `${textSize} font-semibold leading-6 ${textColor}`;

  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      {img && <img src={icon} alt="Icon" className="w-[33px] h-[33px]" />}
      <span className={textClasses}>{text}</span>
    </button>
  );
};

export default FlexibleButton;
