import React from "react";
import CoverImage from "./CoverImage";
import coverImage from "../assets/coverimage.jpg";

const CoverImageExample = () => {
  return (
    <div className="p-4">

      {/* Mobile view (full width) */}
      <div className="mb-8">
        <CoverImage image={coverImage} altText="Channel cover" />
      </div>
    </div>
  );
};

export default CoverImageExample;
