import React from 'react';

const FilterButton = ({ icon, text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-3 py-2 px-[18px] bg-white border border-[#D5D7DA] rounded-lg"
    >
      {/* Icon */}
      <span className="material-icons-outlined text-[20px] text-[#414651]">
        {icon}
      </span>
      
      {/* Text */}
      <span className="text-[16px] font-semibold text-[#414651] font-inter">
        {text}
      </span>
    </button>
  );
};

export default FilterButton; 