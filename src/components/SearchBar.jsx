import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ placeholder = "Search videos..." }) => {
  return (
    <div class="relative flex items-center w-full max-w-[300px] lg:max-w-[500px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] gap-1">
      <div class="pl-3">
        <FontAwesomeIcon 
          icon={faSearch} 
          className="w-4 lg:w-5 h-4 lg:h-5 text-green-600"
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        class="w-full text-[15px] py-2 lg:py-2.5 pl-2 pr-4 rounded-[8px] bg-transparent text-[#414651] font-Inter font-semibold focus:outline-none [&::placeholder]:text-[#414651] [&::placeholder]:font-Inter [&::placeholder]:font-bold"
      />
    </div>
  );
};

export default SearchBar; 