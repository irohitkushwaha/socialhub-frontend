import React, { useState } from "react";
import Logo from "../../ui/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function MobileHeader({ isSideNavOpen, onToggleSideNav }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-[30px] w-full px-[15px] py-[12px] bg-white/28 backdrop-blur-md border-b border-white/50 shadow-md">
      <div class="relative flex items-center justify-between w-full rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[8px]  py-[5px]">
        <Logo textClass={"text-[14px]"} />
        <div className="flex items-center justify-center gap-[20px]">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-[22px] text-[#12B76A]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 0 24 24"
            width="32px"
            fill="#12B76A"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
      <FontAwesomeIcon
        width={27}
        height={27}
        icon={isSideNavOpen ? faXmark : faBars}
        className="text-[28px] text-[#12B76A]"
        onClick={onToggleSideNav}
      />
    </div>
  );
}

export default MobileHeader;
