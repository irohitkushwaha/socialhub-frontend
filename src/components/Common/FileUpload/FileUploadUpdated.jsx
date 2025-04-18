import React, { useState, useRef } from "react";

const FileUploadUpdated = ({
  label = "Profile",
  isMandatory = false,
  icon = "upload", // Default icon name for Material/FontAwesome
  iconType, // 'material' or 'fontawesome'
  iconSize = "w-[60px] h-[60px]",
  iconColor = "text-[#535862]",
  placeholder = "or drag profile image",
  placeholderColor = "text-[#535862]",
  width = "w-full",
  padding = "py-[20px]",
  accept = "image/*,video/*",
  onChange,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  // Handle file selection
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (onChange) onChange(selectedFile);
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (onChange) onChange(droppedFile);
    }
  };

  // Handle click on the upload area
  const handleClick = () => {
    inputRef.current.click();
  };

  // Render the appropriate icon
  const renderIcon = () => {
    let iconElement;
    if (React.isValidElement(icon)) {
      // Handle SVG or other React elements passed as icon
      iconElement = React.cloneElement(icon, {
        className: `${iconColor}`,
        width: "28px",
        height: "28px",
      });
    } else if (iconType === "material") {
      iconElement = (
        <span
          className={`material-icons ${iconColor}`}
          style={{ fontSize: "28px" }}
        >
          {icon}
        </span>
      );
    } else if (iconType === "fontawesome") {
      iconElement = (
        <i
          className={`fa fa-${icon} ${iconColor}`}
          style={{ fontSize: "28px" }}
        ></i>
      );
    }

    return (
      <div className=" flex items-center justify-center">
        <div className=" rounded-[30px] bg-[#F5F5F5] border-[6px] border-[#FAFAFA] flex items-center justify-center">
          {iconElement}
        </div>
      </div>
    );
  };

  return (
    <div className={`${width} px-[10px] flex flex-col gap-[11px]`}>
      {/* Label and mandatory indicator */}
      <div className="flex items-center gap-1">
        <label className="text-[16px] font-medium text-[#414651]">
          {label}
        </label>
        {isMandatory && (
          <span className="text-[16px] font-medium text-[#414651]">*</span>
        )}
      </div>

      {/* Upload area */}
      <div
        className={`w-full px-[16px] ${padding} flex flex-col items-center justify-center gap-[12px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] cursor-pointer transition-colors ${
          dragActive ? "border-[#6941C6] bg-[#F9F5FF]" : ""
        }`}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {/* Icon */}
        {renderIcon()}

        {/* Text */}
        <div className="text-center">
          <span className="text-[14px] font-semibold text-[#6941C6]">
            Click to upload
          </span>{" "}
          <span className={`text-[14px] font-normal ${placeholderColor}`}>
            {placeholder}
          </span>
        </div>

        {/* Show file name if selected */}
        {file && (
          <div className="mt-2 text-[14px] text-gray-600 bg-gray-100 p-2 rounded-md">
            {file.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadUpdated;
