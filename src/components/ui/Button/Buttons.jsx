import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const Button = ({
  icon = faArrowUpFromBracket,
  text = "Upload",
  gap = "gap-[16px]",
  textSize = "text-[13px]  lg:text-[15px]",
  iconSize = "text-[15px]  lg:text-[18px]",
  paddingx = "px-[6px] lg:px-[10px]",
  paddingy = "py-[6px] lg:py-[7px]",
  ...props
}) => {
  // Determine if the icon is a React element (SVG) or a FontAwesome icon
  const isReactElement = React.isValidElement(icon);

  return (
    <button
      {...props}
      className={`flex items-center      rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] cursor-pointer ${paddingy} ${gap} ${paddingx}`}
    >
      {isReactElement ? (
        // If it's an SVG or other React element, render it directly
        <div className="">{icon}</div>
      ) : (
        // Otherwise render as FontAwesome icon
        <FontAwesomeIcon icon={icon} className={`${iconSize} text-green-600`} />
      )}
      <span className={`${textSize}  font-Inter font-semibold text-[#414651]`}>
        {text}
      </span>
    </button>
  );
};

export default Button;
