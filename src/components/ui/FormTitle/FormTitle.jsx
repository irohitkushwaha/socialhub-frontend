// import React from "react";

// const FormTitle = ({
//   children,
//   fontSize = "text-[32px]",
//   lineHeight = "leading-[38px]",
//   fontWeight = "font-semibold",
//   color = "text-[#181D27]",
//   className = "",
//   isWavy = false,
// }) => {
//   return (
//     <h2
//       className={`${fontSize} ${lineHeight} ${fontWeight} ${color} ${className}`}
//     >
//       {children}
//     </h2>
//   );
// };

// export default FormTitle;

// FormTitle.jsx
import React from "react";
import WavyText from "../WavyText"; // Import your WavyText component

const FormTitle = ({
  children,
  fontSize = "text-[32px]",
  lineHeight = "leading-[38px]",
  fontWeight = "font-semibold",
  color = "text-[#181D27]",
  className = "",
  isWavy = false, // New prop to toggle wavy effect
}) => {
  return (
    <h2
      className={`${fontSize} ${lineHeight} ${fontWeight} ${color} ${className}`}
    >
      {isWavy && typeof children === 'string' ? (
        <WavyText text={children} color={color.replace('text-', '')} />
      ) : (
        children
      )}
    </h2>
  );
};

export default FormTitle;
