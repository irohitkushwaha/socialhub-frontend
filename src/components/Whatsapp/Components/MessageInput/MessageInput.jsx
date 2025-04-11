import React, { useState, useRef } from "react";

const MessageInput = ({ onMessageSend }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [showFileOptions, setShowFileOptions] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() || selectedFile) {
      onMessageSend(inputValue, selectedFile);
      setInputValue("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setFileType(null);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
          setFileType("image");
        };
        reader.readAsDataURL(file);
      } else {
        setFileType("document");
        setPreviewUrl(file.name);
      }
    }
    setShowFileOptions(false);
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleDocumentClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileType(null);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return "picture_as_pdf";
      case "doc":
      case "docx":
        return "description";
      case "txt":
        return "article";
      default:
        return "insert_drive_file";
    }
  };

  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="flex flex-col gap-2">
      {/* Preview Section */}
      {previewUrl && (
        <div className="relative flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
          {fileType === "image" ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-[48px] h-[48px] object-cover rounded-lg"
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="material-symbols-rounded text-[24px] text-[#12B76A]">
                {getFileIcon(previewUrl)}
              </span>
              <span className="text-sm text-gray-700 truncate max-w-[200px]">
                {previewUrl}
              </span>
            </div>
          )}
          <button
            onClick={removeFile}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <span className="material-symbols-rounded text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Input Section */}
      <div className="flex flex-row items-center px-[8px] py-[12px] gap-[13px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]">
        {/* Hidden file inputs */}
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Left side - Icons */}
        <div className="relative">
          <button
            type="button"
            className="text-[#414651]"
            onClick={() => setShowFileOptions(!showFileOptions)}
          >
            <span className="material-symbols-rounded text-[24px]">
              {isMobile ? "attach_file" : "add"}
            </span>
          </button>

          {/* File Options Dropdown */}
          {showFileOptions && (
            <div className="absolute bottom-full left-0 mb-2 flex gap-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <button
                type="button"
                className="text-[#12B76A]"
                onClick={handleImageClick}
              >
                <span className="material-symbols-rounded text-[24px]">
                  photo_library
                </span>
              </button>

              <button
                type="button"
                className="text-[#12B76A]"
                onClick={handleDocumentClick}
              >
                <span className="material-symbols-rounded text-[24px]">
                  file_copy
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Right side - Input field and Send button */}
        <form
          className="flex-1 flex items-center gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a Message ..."
            className="w-full px-[25px] py-[8px] text-[18px] font-medium text-[#414651] placeholder:text-[#414651] rounded-[8px] border border-[#D5D7DA] focus:outline-none"
          />
          {(inputValue.trim() || selectedFile) && (
            <button
              type="submit"
              className="text-[#12B76A] hover:text-[#0E9D5B] transition-colors"
            >
              <span className="material-symbols-rounded text-[24px]">send</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
