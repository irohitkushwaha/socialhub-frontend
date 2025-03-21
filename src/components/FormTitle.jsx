import React from "react";

const FormTitle = ({
  children,
  fontSize = "text-[32px]",
  lineHeight = "leading-[38px]",
  fontWeight = "font-semibold",
  color = "text-[#181D27]",
  className = "",
}) => {
  return (
    <h2
      className={`${fontSize} ${lineHeight} ${fontWeight} ${color} ${className}`}
    >
      {children}
    </h2>
  );
};

export default FormTitle;
