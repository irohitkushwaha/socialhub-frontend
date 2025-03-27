import React, { useState } from "react";

const PasswordChange = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center gap-[18px]">
      <span className="text-base sm:text-xl font-semibold text-[#414651]">
        Change Password
      </span>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="New password"
        className="text-sm sm:text-base px-[8px] sm:px-[16px] py-[10px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] focus:outline-none w-[160px] sm:w-[230px]"
      />
    </div>
  );
};

export default PasswordChange;
