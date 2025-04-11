import React, { useState } from "react";
import ShareModal from "./ShareModal";

const ShareModalExample = () => {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="p-4">
      {/* Video content placeholder */}
      <div className="bg-gray-900 aspect-video w-full max-w-lg mx-auto mb-4 flex items-center justify-center text-white">
        Video Content
      </div>

      {/* Share button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Share
        </button>
      </div>

      {/* Share modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url="https://example.com/video/12345"
        title="Check out this amazing video!"
      />
    </div>
  );
};

export default ShareModalExample;
