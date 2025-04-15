import React from "react";
import Logo from "../../ui/Logo";
import SearchBar from "../../ui/SearchBar";
import Button from "../../ui/Button";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Header = ({ showSearchBar, upload }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled more than 20px
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4
                bg-white/8 backdrop-blur-md border-b border-white/30 shadow-md"
    >
      <Logo />
      {showSearchBar && <SearchBar />}
      <div className="flex items-center gap-[50px]">
        {upload && <Button text="Upload" icon={faArrowUpFromBracket} />}
        <Button text="Login" icon={faArrowRightToBracket} />
      </div>
    </header>
  );
};

export default Header;
