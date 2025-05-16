import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import TypewriterEffect from "../../../utils/typewritereffect.jsx";

const SearchBar = ({ defaultPlaceholder = "Search videos...." }) => {
  const navigate = useNavigate();

  const [placeholder, setPlaceholder] = useState("");
  // const fullText = defaultPlaceholder;
  // const [isTyping, setIsTyping] = useState(true);
  // const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   let timer;

  //   if (isTyping) {
  //     // Typing forward
  //     if (index < fullText.length) {
  //       timer = setTimeout(() => {
  //         setPlaceholder(fullText.substring(0, index + 1));
  //         setIndex(index + 1);
  //       }, 100); // Typing speed
  //     } else {
  //       // Pause at the end
  //       timer = setTimeout(() => {
  //         setIsTyping(false);
  //       }, 600); // Pause duration
  //     }
  //   } else {
  //     // Erasing
  //     if (index > 0) {
  //       timer = setTimeout(() => {
  //         setPlaceholder(fullText.substring(0, index - 1));
  //         setIndex(index - 1);
  //       }, 70); // Erasing speed (faster than typing)
  //     } else {
  //       // Pause before typing again
  //       timer = setTimeout(() => {
  //         setIsTyping(true);
  //       }, 200); // Pause before starting again
  //     }
  //   }

  //   return () => clearTimeout(timer);
  // }, [fullText, index, isTyping]);

  // Handler for input changes

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
        className="w-full text-[17px] py-2 lg:py-2.5 pl-2 pr-4 rounded-[8px] bg-transparent text-[#414651] font-Inter font-semibold placeholder:text-[17px] focus:outline-none [&::placeholder]:text-[#414651] [&::placeholder]:font-Inter [&::placeholder]:font-bold"
      />
    </form>
  );
};

export default SearchBar;
