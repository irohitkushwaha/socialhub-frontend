import React, { useState, useEffect, useRef } from "react";

const PostDetails = ({ likeCount, title }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    // Check if text is truncated (exceeds two lines)
    const checkTruncation = () => {
      if (titleRef.current) {
        // Force the element to show only 2 lines to check if it would be truncated
        titleRef.current.style.display = "-webkit-box";
        titleRef.current.style.WebkitLineClamp = "2";
        titleRef.current.style.WebkitBoxOrient = "vertical";

        const scrollHeight = titleRef.current.scrollHeight;
        const clientHeight = titleRef.current.clientHeight;

        // If scrollHeight > clientHeight, then text is truncated
        setIsTruncated(scrollHeight > clientHeight + 5); // Adding small buffer for precision

        // Reset styles if showing full text
        if (showFullText) {
          titleRef.current.style.WebkitLineClamp = "unset";
        }
      }
    };

    // Run on mount and when title/showFullText changes
    setTimeout(checkTruncation, 0); // Using setTimeout to ensure DOM is updated

    // Re-check on resize
    window.addEventListener("resize", checkTruncation);

    return () => {
      window.removeEventListener("resize", checkTruncation);
    };
  }, [title, showFullText]);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  // Function to render title with blue hashtags
  const renderTitleWithHashtags = (text) => {
    // Split the text by spaces to identify words
    const words = text.split(" ");

    // Map through the words and apply blue color to hashtags
    return words.map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span key={index} style={{ color: "#026df0" }}>
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div
      className="flex flex-col justify-start gap-[15px] w-full"
      style={{
        width: isMobile ? "100%" : "100%",
      }}
    >
      {/* Like count */}
      <p
        className="text-[#414651] font-medium md:font-semibold"
        style={{
          fontSize: isMobile ? "16px" : "18px",
        }}
      >
        {likeCount.toLocaleString()} likes
      </p>

      {/* Post title */}
      <div className="relative">
        <div
          ref={titleRef}
          className="text-[#414651] font-medium md:font-semibold leading-7 md:leading-8"
          style={{
            fontSize: isMobile ? "16px" : "18px",
            display: showFullText ? "block" : "-webkit-box",
            WebkitLineClamp: showFullText ? "unset" : 2,
            WebkitBoxOrient: "vertical",
            overflow: showFullText ? "visible" : "hidden",
            textOverflow: "ellipsis",
            position: "relative",
          }}
        >
          {renderTitleWithHashtags(title)}

          {isTruncated && !showFullText && (
            <button
              onClick={handleToggleText}
              className="text-[#737374] md:font-semibold cursor-pointer font-medium outline-none inline-block ml-1"
              style={{
                fontSize: isMobile ? "16px" : "18px",
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                paddingLeft: "4px",
              }}
            >
              ... more
            </button>
          )}
        </div>

        {showFullText && (
          <button
            onClick={handleToggleText}
            className="text-[#737374] md:font-semibold cursor-pointer font-medium outline-none ml-1"
            style={{
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            less
          </button>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
