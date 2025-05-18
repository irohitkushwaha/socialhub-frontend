import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from 'react-router-dom';

import TypewriterEffect from "../../../utils/typewritereffect.jsx";

const SearchBar = ({ defaultPlaceholder = "Search videos...." }) => {
  const navigate = useNavigate();
  const location = useLocation();


  const [placeholder, setPlaceholder] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // Handler for input changes

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Extract current search query from URL, if any
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q');
    
    // Only set the search term from URL if we're on the search page
    // Otherwise, clear the search input
    if (location.pathname === '/youtube/search') {
      setSearchTerm(queryParam || '');
    } else {
      setSearchTerm('');
    }
  }, [location.pathname, location.search]);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/youtube/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-[300px] lg:max-w-[500px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] gap-1"
    >
      <div className="pl-3">
        <FontAwesomeIcon
          icon={faSearch}
          className="w-4 lg:w-10 h-4 lg:h-10 text-green-600"
        />
      </div>
      <div className="absolute opacity-0 pointer-events-none">
        <TypewriterEffect
          text={defaultPlaceholder}
          typingSpeed={100}
          erasingSpeed={90}
          pauseBeforeErasing={600}
          pauseBeforeTyping={200}
          willErase={true}
          loop={true}
          onTextUpdate={setPlaceholder}
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full text-[15px] md:text-[17px] py-2 lg:py-2.5 pl-2 pr-4 rounded-[8px] bg-transparent text-[#414651] font-Inter font-semibold md:placeholder:text-[17px] placeholder:text-[15px] focus:outline-none [&::placeholder]:text-[#414651] [&::placeholder]:font-Inter [&::placeholder]:font-bold"
      />
    </form>
  );
};

export default SearchBar;
