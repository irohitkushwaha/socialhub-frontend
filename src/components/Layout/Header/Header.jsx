import React from "react";
import Logo from "../../ui/Logo";
import SearchBar from "../../ui/SearchBar";
import Button from "../../ui/Button";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <Logo />
      </Link>
      {showSearchBar && <SearchBar />}
      <div className="flex items-center gap-[50px]">
        {upload && (
          <Link
            to="/youtube/upload-videos"
            // No onClick handler that could stop propagation
            // Event will naturally bubble up to document
          >
            <Button text="Upload" icon={faArrowUpFromBracket} />
          </Link>
        )}
        <Link
          to="/login"
          // No onClick handler that could stop propagation
          // Event will naturally bubble up to document
        >
          <Button text="Login" icon={faArrowRightToBracket} />
        </Link>
        <Link
          to="youtube/playing"
          // No onClick handler that could stop propagation
          // Event will naturally bubble up to document
        >
          <Button text="Youtube" icon={faArrowRightToBracket} />
        </Link>
  
      </div>
    </header>
  );
};

export default Header;
