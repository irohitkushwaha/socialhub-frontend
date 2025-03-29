import React from "react";
import ThumbnailReels from "./ThumbnailReels";

// Import images from assets/watch folder
import watch1 from "../assets/watch/watch1.jpg";
import watch2 from "../assets/watch/watch2.jpg";
import watch3 from "../assets/watch/watch3.jpg";

const WatchedReels = () => {
  // Mock data using local images
  const reelThumbnails = [
    {
      id: 1,
      imageUrl: watch1,
      altText: "Reel 1",
    },
    {
      id: 2,
      imageUrl: watch2,
      altText: "Reel 2",
    },
    {
      id: 3,
      imageUrl: watch3,
      altText: "Reel 3",
    },
    {
      id: 4,
      imageUrl: watch1, // Reusing images to have 10 items
      altText: "Reel 4",
    },
    {
      id: 5,
      imageUrl: watch2,
      altText: "Reel 5",
    },
    {
      id: 6,
      imageUrl: watch3,
      altText: "Reel 6",
    },
    {
      id: 7,
      imageUrl: watch1,
      altText: "Reel 7",
    },
    {
      id: 8,
      imageUrl: watch2,
      altText: "Reel 8",
    },
    {
      id: 9,
      imageUrl: watch3,
      altText: "Reel 9",
    },
    {
      id: 10,
      imageUrl: watch1,
      altText: "Reel 10",
    },
  ];

  return (
    <div className="w-full px-[1px] md:px-[10px] py-6">
      <div className="flex flex-wrap gap-[5px] md:gap-[10px] justify-center md:justify-center">
        {reelThumbnails.map((reel) => (
          <ThumbnailReels
            key={reel.id}
            imageUrl={reel.imageUrl}
            altText={reel.altText}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchedReels;
