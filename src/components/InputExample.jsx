import React from "react";
import Input from "./Input";

const InputExample = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Input label="Email" placeholder="Enter your email" isMandatory={true} />
      <Input
        label="Password"
        placeholder="Enter your password"
        helpText="Must be at least 8 characters."
        isMandatory={true}
      />
    </div>
  );
};

export default InputExample;
