import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

const Button = ({ icon = faArrowUpFromBracket, text = "Upload", ...props }) => {
  return (
    <button 
      {...props}
      class="relative flex items-center gap-2 px-4 rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
    >
      <FontAwesomeIcon 
        icon={icon} 
        className="text-[18px] text-green-600"
      />
      <span class="text-[15px] py-2 lg:py-2.5 font-Inter font-semibold text-[#414651]">
        {text}
      </span>
    </button>
  );
};

export default Button;
