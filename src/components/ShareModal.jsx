import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeShareModal } from "../redux/slices/shareSlice";
import {
  selectIsShareModalOpen,
  selectShareData,
} from "../redux/slices/shareSlice";

const ShareModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsShareModalOpen);
  const { url = window.location.href, title = "Check this out!" } =
    useSelector(selectShareData);

  if (!isOpen) return null;

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6 fill-current"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      ),
      shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        title + " " + url
      )}`,
    },
    {
      name: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-6 h-6 fill-current"
        >
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>
      ),
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-6 h-6 fill-current"
        >
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
        </svg>
      ),
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Email",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-6 h-6 fill-current"
        >
          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
        </svg>
      ),
      shareUrl: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(url)}`,
    },
  ];

  const handleShare = (shareUrl) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    // Optional: close modal after sharing
    // dispatch(closeShareModal());
  };

  return (
    <div className="bg-white rounded-lg w-full shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Share</h3>
        <button
          onClick={() => dispatch(closeShareModal())}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 cursor-pointer"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {/* Share options */}
      <div className="p-3 overflow-x-auto">
        <div className="flex justify-between md:justify-between">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option.shareUrl)}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors min-w-[70px] flex-shrink-0 cursor-pointer"
            >
              <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center bg-gray-100">
                {option.icon}
              </div>
              <span className="text-sm text-gray-700 whitespace-nowrap">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Link to share */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-stretch">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 p-2 mr-5 text-sm border border-gray-300 rounded-md bg-white text-black w-full"
            onClick={(e) => e.target.select()}
          />
          <button
            onClick={(event) => {
              // Create temporary input element
              const tempInput = document.createElement("input");
              tempInput.value = url;
              tempInput.style.position = "fixed";
              tempInput.style.opacity = "0";
              document.body.appendChild(tempInput);

              // Select the text
              tempInput.focus();
              tempInput.select();
              tempInput.setSelectionRange(0, 99999); // For mobile devices

              // Try the copy operation
              let successful = false;
              try {
                successful = document.execCommand("copy");
              } catch (err) {
                console.error("execCommand Error", err);
              }

              // If execCommand failed, try clipboard API
              if (!successful) {
                try {
                  navigator.clipboard
                    .writeText(url)
                    .then(() => {
                      successful = true;
                    })
                    .catch((err) => console.error("Clipboard API Error:", err));
                } catch (err) {
                  console.error("Clipboard API not available", err);
                }
              }

              // Clean up
              document.body.removeChild(tempInput);

              // Visual feedback (without alert)
              const originalText = event.target.innerText;
              event.target.innerText = "Copied !";
              event.target.disabled = true;
              setTimeout(() => {
                event.target.innerText = originalText;
                event.target.disabled = false;
              }, 2000);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
