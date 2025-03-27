import React, { useState } from "react";

const ProfileView = ({
  name = "Shradha Khapra",
  id = "@shradhakhapra123",
  email = "shradha@apnacollege.com",
  subscribers = "4.9M",
  videos = "550",
  edit = false,
}) => {
  // Use local state to track editable values
  const [editableName, setEditableName] = useState(name);
  const [editableId, setEditableId] = useState(id);
  const [editableEmail, setEditableEmail] = useState(email);

  // Handle input changes
  const handleNameChange = (e) => {
    setEditableName(e.target.value);
  };

  const handleIdChange = (e) => {
    setEditableId(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditableEmail(e.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-5 sm:gap-6">
      {/* Name - Input or Text */}
      {edit ? (
        <input
          type="text"
          value={editableName}
          onChange={handleNameChange}
          className="text-2xl sm:text-3xl font-bold text-[#181717] px-[10px] sm:px-[16px] py-[7px] sm:py-[15px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] focus:outline-none w-[210px] sm:w-[285px]"
        />
      ) : (
        <h1 className="text-2xl sm:text-3xl font-bold text-[#181717]">
          {name}
        </h1>
      )}

      {/* Channel ID and Email */}
      <div className="flex flex-col sm:flex-row sm:gap-[21px]">
        {edit ? (
          <input
            type="text"
            value={editableId}
            onChange={handleIdChange}
            className="text-lg sm:text-xl font-semibold text-[#414651] px-[6px] sm:px-[16px] py-[10px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] mb-3 sm:mb-0 focus:outline-none w-[180px] sm:w-[250px]"
          />
        ) : (
          <p className="text-lg sm:text-xl font-semibold text-[#414651]">
            {id}
          </p>
        )}

        {edit ? (
          <input
            type="text"
            value={editableEmail}
            onChange={handleEmailChange}
            className="text-lg sm:text-xl font-semibold text-[#414651] px-[8px] sm:px-[16px] py-[10px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] focus:outline-none w-[250px] sm:w-[300px]"
          />
        ) : (
          <p className="hidden sm:block text-lg sm:text-xl font-semibold text-[#414651]">
            {email}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-[21px]">
        <p className="text-lg sm:text-xl font-semibold text-[#414651]">
          {subscribers} Subscribers
        </p>
        <p className="text-lg sm:text-xl font-semibold text-[#414651]">
          {videos} Videos
        </p>
      </div>
    </div>
  );
};

export default ProfileView;
