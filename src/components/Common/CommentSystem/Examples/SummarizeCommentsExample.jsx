import React, { useState } from "react";
import SummarizeComments from "../SummarizeComments";
import ButtonVideo from "../../../Youtube/Components/ButtonVideo/ButtonVideo";

const SummarizeCommentsExample = () => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="p-4 flex flex-col items-center justify-center gap-4 ">
      <ButtonVideo
        icon="auto_awesome"
        text="Summarize Comments"
        className={`hover:bg-[#F0F0F0] ${
          showSummary ? "bg-[#F0F0F0]" : "bg-white"
        }`}
        onClick={() => setShowSummary(!showSummary)}
      />

      <SummarizeComments showSummary={showSummary} />
    </div>
  );
};

export default SummarizeCommentsExample;
