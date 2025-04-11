import React from "react";
import FlexibleButton from "./FlexibleButton";
import googleIcon from "../assets/google.webp";

const FlexibleButtonExample = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Default button */}
      <FlexibleButton text="Create Account" bgColor="bg-[#7F56D9]" textColor="text-white" textSize="text-[16px]"/>
    </div>
  );
};

export default FlexibleButtonExample;
