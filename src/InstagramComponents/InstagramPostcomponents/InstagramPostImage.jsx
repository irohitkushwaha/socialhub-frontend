import React, { useState, useEffect } from "react";

const InstagramPostImage = ({ imageUrl, altText = "Instagram post" }) => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div
      className="overflow-hidden w-full aspect-[4/4] md:aspect-[4/3]"
      style={{
        // width: isMobile ? "100%" : "300px",
        // height: isMobile ? "427px" : "572px",
        borderRadius: "5px",
        // Using a 4:5 aspect ratio container
        // aspectRatio: "4/4 ",
        backgroundColor: "#f0f0f0", // Light background for loading state
      }}
    >
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default InstagramPostImage;
