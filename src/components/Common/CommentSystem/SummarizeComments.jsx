import React from "react";

const SummarizeComments = ({
  showSummary = true,
  positiveText = "60% of comments are positive, praising its innovative, tech-forward approach",
  negativeText = "40% of comments are negative, noting outdated points and shallow mobile design.",
}) => {
  return (
    <div className="w-full">
      {/* Summarized Comments Section */}
      {showSummary && (
        <div className="px-[10px] lg:px-[17px] py-[15px] lg:py-[15px] flex flex-col gap-[30px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]">
          {/* Positive Comments */}
          <div className="flex items-start gap-[13px] w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              className="w-[60px] h-[40px] lg:w-[30px] lg:h-[37px]"
              fill="#00c950"
            >
              {/* <g>
              <rect fill="none" height="24" width="24" x="0" y="0" />
            </g> */}
              <g>
                <g>
                  <path d="M9,21h9c0.83,0,1.54-0.5,1.84-1.22l3.02-7.05C22.95,12.5,23,12.26,23,12v-2c0-1.1-0.9-2-2-2h-6.31l0.95-4.57l0.03-0.32 c0-0.41-0.17-0.79-0.44-1.06L14.17,1L7.58,7.59C7.22,7.95,7,8.45,7,9v10C7,20.1,7.9,21,9,21z M9,9l4.34-4.34L12,10h9v2l-3,7H9V9z M1,9h4v12H1V9z" />
                </g>
              </g>
            </svg>
            <p className="text-[16px] md:text-[18px] font-semibold text-[#414651]">
              {positiveText}
            </p>
          </div>

          {/* Negative Comments */}
          <div className="flex items-start gap-[13px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              fill="#00c950"
              className="w-[60px] h-[40px] lg:w-[30px] lg:h-[40px]"
            >
              {/* <g>
              <rect fill="none" height="24" width="24" />
            </g> */}
              <g>
                <g>
                  <path d="M15,3H6C5.17,3,4.46,3.5,4.16,4.22l-3.02,7.05C1.05,11.5,1,11.74,1,12v2c0,1.1,0.9,2,2,2h6.31l-0.95,4.57l-0.03,0.32 c0,0.41,0.17,0.79,0.44,1.06L9.83,23l6.59-6.59C16.78,16.05,17,15.55,17,15V5C17,3.9,16.1,3,15,3z M15,15l-4.34,4.34L12,14H3v-2 l3-7h9V15z M19,3h4v12h-4V3z" />
                </g>
              </g>
            </svg>
            <p className="text-[16px] md:text-[18px] font-Inter font-semibold text-[#414651]">
              {negativeText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummarizeComments;
