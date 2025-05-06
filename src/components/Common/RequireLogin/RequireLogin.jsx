// src/components/Common/Auth/RequireLogin.jsx
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { isLoggedin } from "../../../redux/slices/authentication.slice";

const RequireLogin = ({
  children,
  message = "Please login to perform this action",
  promptClassName = "",
}) => {
  const isUserLoggedin = useSelector(isLoggedin);
  const [showPrompt, setShowPrompt] = useState(false);
  const containerRef = useRef(null);

  const handleClick = (e) => {
    if (!isUserLoggedin) {
      e.stopPropagation();
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 3000); // auto-hide after 3s
    } else if (typeof children.props.onClick === "function") {
      children.props.onClick(e);
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {React.cloneElement(children, { onClick: handleClick })}
      {showPrompt && (
        <div
          className={
            "absolute left-0 mt-2 w-max bg-white border border-gray-300 rounded shadow text-sm px-3 py-2 z-10 " +
            promptClassName
          }
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default RequireLogin;