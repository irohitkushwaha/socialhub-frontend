import React from "react";
import FileUploadUpdated from "./FileUploadUpdated";

const FileUploadUpdatedExample = () => {
  const handleFileChange = (file) => {
    console.log("Selected file:", file);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <h2 className="text-xl font-bold">Updated File Upload</h2>

      {/* Default with Material Icons */}
      <FileUploadUpdated
        label="Profile"
        isMandatory={true}
        icon="upload"
        iconType="material"
        placeholder="or drag profile image"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadUpdatedExample;
