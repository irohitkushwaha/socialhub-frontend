import React from "react";
import Toggle from "./Toggle";

const ToggleExample = () => {
  const handleToggleChange = (isActive) => {
    console.log("Toggle state:", isActive);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Toggle
        label="Dark mode"
        initialState={false}
        onChange={handleToggleChange}
      />
    </div>
  );
};

export default ToggleExample;
