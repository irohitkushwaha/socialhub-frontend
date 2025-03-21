import React from "react";

// Version with Google Material Icons
const ActionButtonMaterial = ({ icon, text = "View Profile" }) => {
  return (
    <div className="w-full flex items-center px-4 py-2.5 gap-3 cursor-pointer hover:bg-gray-50">
      <span
        className="material-icons text-green-500"
        style={{ fontSize: "22px" }}
      >
        {icon}
      </span>
      <span className="text-[18px] font-medium text-[#414651]">{text}</span>
    </div>
  );
};

// Version with Font Awesome
const ActionButtonFA = ({ icon, text = "View Profile" }) => {
  return (
    <div className="w-full flex items-center px-4 py-2.5 gap-3 cursor-pointer hover:bg-gray-50">
      <i
        className={`fa ${icon} text-green-500`}
        style={{ fontSize: "16px" }}
      ></i>
      <span className="text-[14px] font-medium text-[#414651]">{text}</span>
    </div>
  );
};

// Main component that chooses which implementation to use
const ActionButton = ({
  icon,
  text = "View Profile",
  iconType = "material",
}) => {
  if (iconType === "material") {
    return <ActionButtonMaterial icon={icon} text={text} />;
  } else if (iconType === "fa") {
    return <ActionButtonFA icon={icon} text={text} />;
  }

  // Default fallback
  return <ActionButtonMaterial icon={icon} text={text} />;
};

export default ActionButton;
