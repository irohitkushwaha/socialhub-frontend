import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isLoggedin } from "../../../redux/slices/authentication.slice";

const RequireLogin = ({
  children, // This will be a function
  message = "Please login to perform this action",
  promptClassName = "",
  autoHide = 3000,
}) => {
  const isUserLoggedin = useSelector(isLoggedin);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleClick = (e) => {
    if (!isUserLoggedin) {
      e.stopPropagation();
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), autoHide);
      return false; // prevent action
    }
    return true; // allow action
  };

  // children is a function that gets {showPrompt, handleClick}
  return children({ showPrompt, handleClick });
};

export default RequireLogin;