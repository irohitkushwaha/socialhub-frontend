import React from "react";
import Logo from "../../ui/Logo";
import SearchBar from "../../ui/SearchBar";
import Button from "../../ui/Button";
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <Logo />
      <SearchBar />
      <Button text="Upload" icon = {faArrowUpFromBracket} />
      <Button text="Login" icon = {faArrowRightToBracket} />
    </header>
  );
};

export default Header;
