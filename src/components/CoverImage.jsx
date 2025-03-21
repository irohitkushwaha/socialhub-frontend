import React from "react";
import EditIcon from "./EditIcon";

const CoverImage = ({ image, altText = "Cover image" }) => {
  return (
    <div className="relative w-full lg:max-w-[1300px] mx-auto overflow-visible h-[90px] lg:h-[200px]">
      <img
        src={image}
        alt={altText}
        className="w-full h-full rounded-[15px] object-cover"
      />
      <div
        style={{ position: "absolute", top: "-23px", left: "8px", zIndex: 9999 }}
      >
        <EditIcon />
      </div>
    </div>
  );
};

export default CoverImage;
