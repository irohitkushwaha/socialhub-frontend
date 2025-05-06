import React, { useState, useRef, useEffect } from "react";

const Description = ({
  views = "",
  publishedDate,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef(null);

  // Split description into paragraphs
  const paragraphs = description ? description.split("\n\n") : []

  // Function to truncate text at half of the second paragraph
  const getTruncatedParagraphs = () => {
    if (paragraphs.length <= 1) {
      return paragraphs;
    }

    // If not expanded, only show first paragraph and half of second
    if (!expanded) {
      const result = [...paragraphs];
      if (result.length > 1) {
        // Get half of the second paragraph and add ellipsis
        const secondParagraph = result[1];
        const halfLength = Math.floor(secondParagraph.length / 2);
        result[1] = secondParagraph.substring(0, halfLength) + "...";

        // Remove paragraphs after the second one
        if (result.length > 2) {
          return result.slice(0, 2);
        }
      }
      return result;
    }

    // If expanded, show all paragraphs
    return paragraphs;
  };

  // Check if content is overflowing and needs "show more" button
  useEffect(() => {
    // If there's more than one paragraph, we'll always show the button
    if (paragraphs.length > 1) {
      setShowButton(true);
    } else if (contentRef.current) {
      const element = contentRef.current;
      // Check if content height exceeds the container height when collapsed
      setShowButton(element.scrollHeight > element.clientHeight);
    }
  }, [description, paragraphs.length]);

  const displayParagraphs = expanded ? paragraphs : getTruncatedParagraphs();

  return (
    <div className="w-full h-fit min-h-[80px]">
      <div className="rounded-[8px] w-full px-[10px] md:px-[18px] py-[13px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]  relative">
        <div className="flex items-center gap-[15px] md:gap-[20px] mb-[15px] md:mb-[20px]">
          <span className="text-[15px] md:text-[18px] font-bold text-[#414651]">
            {views} views
          </span>
          <span className="text-[15px] md:text-[18px] font-bold text-[#414651]">
            {publishedDate}
          </span>
        </div>

        {/* Description Content */}
        <div ref={contentRef} className="relative">
          <div className="space-y-[13px] md:space-y-[13px]">
            {description ? (
              displayParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15px] md:text-[17px] font-semibold text-[#414651] 
                leading-[25px]
                md:leading-[28px]"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p
                className="text-[15px] md:text-[17px] italic font-semibold text-[#414651] 
              leading-[25px]
              md:leading-[28px]"
              >
                No Description
              </p>
            )}
          </div>
        </div>

        {/* Show More/Less Button - Mobile (bottom right) */}
        {showButton && (
          <>
            {/* Mobile Button */}
            <div
              className={`flex justify-end ${
                expanded ? "mt-[15px]" : "mt-[0px]"
              } `}
            >
              <button
                onClick={() => setExpanded(!expanded)}
                className="px-[8px] py-[5px] text-[16px] font-semibold text-[#414651] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] rounded-[4px] cursor-pointer"
              >
                {expanded ? "Show Less" : "More..."}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Description;
