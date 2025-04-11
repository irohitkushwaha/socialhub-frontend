import React from 'react';

const SummarizeComments = ({ 
  showSummary = false,
  positiveText = "60% of comments are positive, praising its innovative, tech-forward approach",
  negativeText = "40% of comments are negative, noting outdated points and shallow mobile design."
}) => {
  return (
    <div className="w-full">
      {/* Summarized Comments Section */}
      {showSummary && (
        <div className="px-[15px] py-[27px] flex flex-col gap-[48px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] mb-6">
          {/* Positive Comments */}
          <div className="flex items-start gap-[10px]">
            <span className="material-symbols-outlined text-green-600 text-[30px] mt-[5px] mr-[10px] flex-shrink-0 ">
              thumb_up
            </span>
            <p className="text-[18px] md:text-[24px] font-semibold text-[#414651]">
              {positiveText}
            </p>
          </div>
          
          {/* Negative Comments */}
          <div className="flex items-start gap-[10px]">
            <span className="material-symbols-outlined text-green-600 text-[30px] mr-[10px] flex-shrink-0 leading-none mt-[5px]">
              thumb_down
            </span>
            <p className="text-[18px] md:text-[24px] font-semibold text-[#414651]">
              {negativeText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummarizeComments; 