import React, { useState } from "react";

const formatSubscriberCount = (value) => {
  if (value === 0) {
    return "";
  } else if (value >= 1000000) {
    return `${value / 1000000}M`;
  } else if (value >= 1000) {
    return `${value / 1000}K`;
  }
  return value;
};

// Format time period
const formatTimePeriod = (days) => {
  if (days === 0) {
    return "Now";
  } else if (days >= 365) {
    return `${Math.round(days / 365)} year${days >= 730 ? "s" : ""}`;
  } else if (days >= 30) {
    return `${Math.round(days / 30)} month${days >= 60 ? "s" : ""}`;
  } else if (days >= 7) {
    return `${Math.round(days / 7)} week${days >= 14 ? "s" : ""}`;
  }
  return `${days} day${days !== 1 ? "s" : ""}`;
};

const RangeSlider = ({
  title,
  minValue,
  maxValue,
  initialMin,
  initialMax,
  step,
  formatLabel,
}) => {
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);
  
  // Calculate the percentage for positioning
  const getPercent = (value) => {
    return ((value - minValue) / (maxValue - minValue)) * 100;
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
  };

  return (
    <div className="w-[297px] px-[16px] pb-[25px] pt-[16px] rounded-[9px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_6px_#F5F5F5] lg:shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_4px_#F5F5F5]">
      <h3 className="text-[20px] text-center font-semibold text-[#414651] mb-5">{title}</h3>

      <div className="relative w-[201px] mx-auto h-[40px]">
        {/* Track and progress bar */}
        <div className="w-full h-1 bg-[#E9EAEB] rounded-sm absolute top-[8px]">
          <div
            className="h-1 bg-[#7F56D9] rounded-sm absolute"
            style={{
              left: `${getPercent(minVal)}%`,
              width: `${getPercent(maxVal) - getPercent(minVal)}%`,
            }}
          ></div>
        </div>

        {/* Custom thumbs */}
        <div
          className="w-[18px] h-[18px] bg-white border-2 border-[#7F56D9] rounded-full absolute top-[9px] -translate-y-1/2 z-20 cursor-pointer"
          style={{ left: `calc(${getPercent(minVal)}% - 9px)` }}
        ></div>
        <div
          className="w-[18px] h-[18px] bg-white border-2 border-[#7F56D9] rounded-full absolute top-[9px] -translate-y-1/2 z-20 cursor-pointer"
          style={{ left: `calc(${getPercent(maxVal)}% - 9px)` }}
        ></div>

        {/* Range inputs for actual functionality */}
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={minVal}
          step={step}
          onChange={handleMinChange}
          className="absolute w-full h-1 top-[9px] opacity-0 z-30 cursor-pointer"
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={maxVal}
          step={step}
          onChange={handleMaxChange}
          className="absolute w-full h-1 top-[9px] opacity-0 z-30 cursor-pointer"
        />

        {/* Labels - positioned BELOW the slider */}
        <div className="flex justify-between absolute w-full top-[30px]">
          <span className="text-[16px] font-medium text-[#414651]">
            {formatLabel(minVal)}
          </span>
          <span className="text-[16px] font-medium text-[#414651]">
            {formatLabel(maxVal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export { RangeSlider, formatSubscriberCount, formatTimePeriod };
