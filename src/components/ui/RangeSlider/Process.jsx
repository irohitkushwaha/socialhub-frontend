import React from "react";
import {
  RangeSlider,
  formatSubscriberCount,
  formatTimePeriod,
} from "./components/RangeSlider";

function Process() {
  return (
    <div className="mb-14 flex justify-center items-center">
      <div className="flex flex-wrap gap-6 mt-6">
        <RangeSlider
          title="Subscribers Range"
          minValue={0}
          maxValue={10000000}
          initialMin={0}
          initialMax={5000000}
          step={50000}
          formatLabel={formatSubscriberCount}
        />

        <RangeSlider
          title="Watch Time Range"
          minValue={0}
          maxValue={730} // 2 years in days
          initialMin={0}
          initialMax={365}
          step={1}
          formatLabel={formatTimePeriod}
        />
      </div>
    </div>
  );
}

export default Process; 