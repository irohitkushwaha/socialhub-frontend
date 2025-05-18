import React from "react";
import Logo from "../../ui/Logo";
import SearchBar from "../../ui/SearchBar";
import Button from "../../ui/Button";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  isLoggedin,
  getUserData,
} from "../../../redux/slices/authentication.slice";
import { useSelector } from "react-redux";
import ProfileImage from "../../Common/ProfileImage/ProfileImageWithStatus";
import NullAvatar from "../../../assets/nullavatar.jpeg";
import ActionButton from "../../ui/ActionButton/ActionButton";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedout } from "../../../redux/slices/authentication.slice";
import { userService } from "../../../Services/api/User.Service";
import { useNavigate } from "react-router-dom";

const Header = ({ showSearchBar, upload }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const location = useLocation();
  const path = location.pathname;

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

  // Determine upload destination based on current path
  const getUploadConfig = () => {
    // For Instagram post paths
    if (path.startsWith("/instagram/posts")) {
      return {
        to: "/instagram/post/upload",
        text: "Upload Post",
      };
    }
    // For Instagram main or other Instagram paths
    else if (path.startsWith("/instagram")) {
      return {
        to: "/instagram/reel/upload",
        text: "Upload Reel",
      };
    }
    // Default: YouTube or homepage
    else {
      return {
        to: "/youtube/upload-videos",
        text: "Upload Video",
      };
    }
  };

  // Get the appropriate configuration
  const uploadConfig = getUploadConfig();

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
            <Link to={uploadConfig.to}>
              <Button text={uploadConfig.text} icon={faArrowUpFromBracket} />
            </Link>
          )}

          {isLoggedIn ? (
            <div className="cursor-pointer" onClick={handleProfileClick}>
              <ProfileImage
                profileImage={UserData.avatar || NullAvatar}
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
              profileImage={UserData.avatar || NullAvatar}
              imgDesktopSize="md:w-[54px] md:h-[54px]"
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
      </header>
    </div>
  );
};

export default Header;
