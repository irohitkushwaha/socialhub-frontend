import React, { useState } from "react";
import Logo from "../../ui/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../ui/SearchBar";
import logo from "../../../assets/logo.png";
import { useEffect } from "react";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { loggedout } from "../../../redux/slices/authentication.slice";
import { userService } from "../../../Services/api/User.Service";
import { useDispatch } from "react-redux";
import ActionButton from "../../ui/ActionButton/ActionButton";
import NullAvatar from "../../../assets/nullavatar.jpeg";
import { useSelector } from "react-redux";
import {
  isLoggedin,
  getUserData,
} from "../../../redux/slices/authentication.slice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import ProfileImage from "../../Common/ProfileImage/ProfileImageWithStatus";

function MobileHeader({ isSideNavOpen, onToggleSideNav }) {
  const [searchClick, setSearchClick] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
    console.log("handle show logged run");
  };

  useEffect(() => {
    setShowLogin(false);
  }, [location.pathname]);

  const isLoggedIn = useSelector(isLoggedin);
  const UserData = useSelector(getUserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API
      await userService.logout();

      // Dispatch the logout action to update Redux state
      dispatch(loggedout());

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // You could add a visual error notification here
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  console.log("value of handleshow login", showLogin);

  const handleClickedToSearch = () => {
    const newSearchClick = !searchClick;
    setSearchClick(newSearchClick);
    // If opening search, push state to history stack
    if (newSearchClick) {
      window.history.pushState({ searchOpen: true }, "");
    }
  };

  // Listen for back button press
  useEffect(() => {
    const handlePopState = () => {
      // When back button is pressed, close the search
      if (searchClick) {
        setSearchClick(false);
      }
    };

    // Add event listener
    window.addEventListener("popstate", handlePopState);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [searchClick]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full  py-[12px] bg-white/28 backdrop-blur-md border-b border-white/50 shadow-md ${
        searchClick ? "gap-[15px] px-[7px]" : "gap-[30px] px-[15px]"
      }`}
    >
      {!searchClick && (
        <div className="relative flex items-center justify-between w-full rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[8px]  py-[5px] z-50">
          <Link to="/">
            <Logo textClass={"text-[14px]"} />
          </Link>
          <div className="relative flex items-center justify-center gap-[20px]">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-[22px] text-[#12B76A]"
              onClick={handleClickedToSearch}
            />
            {isLoggedIn ? (
              <div className="cursor-pointer" onClick={handleProfileClick}>
                <ProfileImage
                  profileImage={UserData.avatar || NullAvatar}
                  isOnline={false}
                  imgMobileSize="w-[40px] h-[40px]"
                />
              </div>
            ) : (
              <div onClick={handleShowLogin}>
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
            )}

            {showLogin && !isLoggedIn && (
              <Link to="/login" className="absolute top-[50px] right-[0px]">
                <Button
                  text="Login"
                  textSize="text-[18px]"
                  icon={faArrowRightToBracket}
                  iconSize="text-[22px]"
                  paddingx="px-[10px]"
                  paddingy="py-[7px]"
                />
              </Link>
            )}
          </div>
        </div>
      )}
      {searchClick && (
        <div className="relative flex items-center justify-between w-full z-50 gap-[10px]">
          <Link to="/">
            <img src={logo} className="h-10" alt="socialhub logo" />
          </Link>
          <SearchBar />
        </div>
      )}
      {isLoggedIn && showProfileMenu && (
        <div className="absolute top-[90px] right-[35px] px-[10px] py-[8px] w-fit  rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_5px_#F5F5F5] flex flex-col justify-start items-start gap-[12px]">
          <ProfileImage
            profileImage={UserData.avatar || NullAvatar}
            imgMobileSize="w-[50px] h-[50px]"
            isOnline={false}
            name={UserData.name}
            email={UserData.email}
            gapbtweenImageAndText="gap-[10px]"
            nameTextSize="text-[18px]"
            emailTextSize="text-[19px]"
            nameTextColor="text-[#414651]"
            gapbetweentext="gap-[1px]"
          />
          <div
            onClick={handleProfileClick}
            className="flex flex-col justify-start w-full gap-[10px]"
          >
            <Link to="/youtube/upload-videos">
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
                text="Upload Videos"
              />
            </Link>
            <Link to="/instagram/reel/upload">
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
                text="Upload Reels"
              />
            </Link>
            <Link to="/instagram/post/upload">
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
                text="Upload Posts"
              />
            </Link>
            <div onClick={handleLogout}>
              <ActionButton
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#00c950"
                    className="w-[23px] h-[23px] lg:w-[25px] lg:h-[25px]"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                }
                text="Logout"
              />
            </div>
          </div>
        </div>
      )}
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
