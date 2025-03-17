import React, { useState, useEffect } from "react";
import {
  RangeSlider,
  formatSubscriberCount,
  formatTimePeriod,
} from "./components/RangeSlider";

function AppSliderRanges() {
  // State to store the selected ranges
  const [subscriberRange, setSubscriberRange] = useState({ min: 0, max: 5000000 });
  const [timeRange, setTimeRange] = useState({ min: 0, max: 365 });
  
  // Handler for subscriber range changes
  const handleSubscriberRangeChange = (min, max) => {
    setSubscriberRange({ min, max });
  };
  
  // Handler for time range changes
  const handleTimeRangeChange = (min, max) => {
    setTimeRange({ min, max });
  };
  
  // Effect to make API call when ranges change
  useEffect(() => {
    // You can debounce this to avoid too many API calls
    const fetchData = async () => {
      try {
        console.log(`Fetching data for subscribers: ${formatSubscriberCount(subscriberRange.min)} to ${formatSubscriberCount(subscriberRange.max)}`);
        console.log(`Fetching data for time: ${formatTimePeriod(timeRange.min)} to ${formatTimePeriod(timeRange.max)}`);
        
        // Example API call
        // const response = await fetch(`/api/data?minSubs=${subscriberRange.min}&maxSubs=${subscriberRange.max}&minTime=${timeRange.min}&maxTime=${timeRange.max}`);
        // const data = await response.json();
        // Process the data...
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    // Call the function
    fetchData();
    
    // Optional: Return a cleanup function if needed
    return () => {
      // Any cleanup code
    };
  }, [subscriberRange, timeRange]); // Re-run when ranges change
  
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
          onRangeChange={handleSubscriberRangeChange}
        />

        <RangeSlider
          title="Watch Time Range"
          minValue={0}
          maxValue={730} // 2 years in days
          initialMin={0}
          initialMax={365}
          step={1}
          formatLabel={formatTimePeriod}
          onRangeChange={handleTimeRangeChange}
        />
      </div>
    </div>
  );
}

export default AppSliderRanges;
