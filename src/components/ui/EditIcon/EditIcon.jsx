import React from "react";

const EditIcon = ({ onClick }) => {
  return (
    <button
      className="px-[11px] py-[4px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <span className="material-symbols-outlined text-[#12B76A] text-[20px] md:text-[35px]">
        edit
      </span>
    </button>
  );
};

export default EditIcon;
