import React from "react";
import Logo from "../../ui/Logo";
import SearchBar from "../../ui/SearchBar";
import Button from "../../ui/Button";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isLoggedin } from "../../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
import ProfileImage from "../../Common/ProfileImage/ProfileImageWithStatus";
import Shradha from "../../../assets/shradha.jpg";
import ActionButton from "../../ui/ActionButton/ActionButton";

const Header = ({ showSearchBar, upload }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isLoggedIn = useSelector(isLoggedin);

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

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header
        className="relative flex items-center justify-between p-4 md:px-[16px] md:py-[10px]
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

          {isLoggedIn ? (
            <div className="cursor-pointer" onClick={handleProfileClick}>
              <ProfileImage
                profileImage={Shradha}
                imgDesktopSize="md:w-[45px] md:h-[45px]"
                isOnline={false}
              />
            </div>
          ) : (
            <Link
              to="/login"
              // No onClick handler that could stop propagation
              // Event will naturally bubble up to document
            >
              <Button text="Login" icon={faArrowRightToBracket} />
            </Link>
          )}
        </div>
        {isLoggedIn && showProfileMenu && (
          <div className="absolute top-[80px] right-[18px] px-[20px] py-[15px]  rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_5px_#F5F5F5] flex flex-col justify-start items-start gap-[12px]">
            <ProfileImage
              profileImage={Shradha}
              imgDesktopSize="md:w-[54px] md:h-[54px]"
              isOnline={false}
              name="Shradha"
              email="shradha@apnacollege.com"
              gapbtweenImageAndText="gap-[10px]"
              nameTextSize="text-[18px]"
              emailTextSize="text-[19px]"
              nameTextColor="text-[#414651]"
              gapbetweentext="gap-[1px]"
            />
            <div className="flex flex-col justify-start w-full gap-[10px]">
              <ActionButton
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    viewBox="0 0 24 24"
                    fill="#00c950"
                    className="w-[23px] h-[23px] lg:w-[30px] lg:h-[30px]"
                  >
                    {/* <g>
                        <rect fill="none" height="24" width="24" />
                      </g> */}
                    <g>
                      <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z" />
                    </g>
                  </svg>
                }
                text="Upload"
              />
              <ActionButton
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    viewBox="0 0 24 24"
                    fill="#00c950"
                    className="w-[23px] h-[23px] lg:w-[30px] lg:h-[30px]"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
                  </svg>
                }
                text="View Profile"
              />
              <ActionButton
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    viewBox="0 0 24 24"
                    fill="#00c950"
                    className="w-[23px] h-[23px] lg:w-[30px] lg:h-[30px]"
                  >
                    <rect fill="none" height="24" width="24" />
                    <path d="M18.6,19.5H21v2h-6v-6h2v2.73c1.83-1.47,3-3.71,3-6.23c0-4.07-3.06-7.44-7-7.93V2.05c5.05,0.5,9,4.76,9,9.95 C22,14.99,20.68,17.67,18.6,19.5z M4,12c0-2.52,1.17-4.77,3-6.23V8.5h2v-6H3v2h2.4C3.32,6.33,2,9.01,2,12c0,5.19,3.95,9.45,9,9.95 v-2.02C7.06,19.44,4,16.07,4,12z M16.24,8.11l-5.66,5.66l-2.83-2.83l-1.41,1.41l4.24,4.24l7.07-7.07L16.24,8.11z" />
                  </svg>
                }
                text="Update Profile"
              />
              <ActionButton
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#00c950"
                    className="w-[23px] h-[23px] lg:w-[30px] lg:h-[30px]"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                }
                text="Logout"
              />
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
