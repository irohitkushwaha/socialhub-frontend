import React, { useEffect, useState } from "react";
import ChatDemo from "../../components/Whatsapp/Containers/ChatDemo";
import SidebarProfile from "../../components/Whatsapp/Components/SidebarProfile";
import SearchBar from "../../components/Whatsapp/Components/SearchBar";
import "./Whatsapp.css"; // Import custom CSS for scrollbar styling
import { useDispatch, useSelector } from "react-redux";
import { isLoggedin } from "../../redux/slices/authentication.slice";
import {
  selectChat,
  selectChatIsSelected,
  clearSelectedChat,
} from "../../redux/slices/sidebarChatSlice";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { chatService } from "../../Services/api/Chat.Service";
import { Link } from "react-router-dom";

function Whatsapp() {
  //h-[calc(100vh-100px)]

  const [sidebarAllUsersProfile, setSidebarAllUsersProfile] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const isUserLoggedIn = useSelector(isLoggedin);

  const fetchAllUsers = async () => {
    try {
      const response = await chatService.getAllUsers();
      console.log("response sidebarbarprofile is", response);

      setSidebarAllUsersProfile(response);
      setLoading(false);
    } catch (error) {
      console.log("error of response sidebarbarprofile is", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      fetchAllUsers();
    }
  }, [isUserLoggedIn]);

  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isSelected = useSelector(selectChatIsSelected);

  // Auto-select the first profile when component mounts
  useEffect(() => {
    if (!isMobile) {
      if (sidebarAllUsersProfile.length > 0) {
        const firstProfile = sidebarAllUsersProfile[0];
        // Select the first profile by default
        dispatch(
          selectChat({
            id: firstProfile.UserName,
            name: firstProfile.FullName,
            email: firstProfile.Email,
            profileImage: firstProfile.Avatar,
          })
        );
        console.log("Auto-selected first profile:", firstProfile.name);
      }
    }
  }, [dispatch, isMobile, sidebarAllUsersProfile]);

  useEffect(() => {
    // Save the original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on body
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Restore original styles when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = "";
    };
  }, []);

  // / Clear chat selection when component unmounts
  useEffect(() => {
    // This function runs when the component unmounts
    return () => {
      dispatch(clearSelectedChat());
      console.log("Component unmounted, chat selection cleared");
    };
  }, []); // Empty dependency array means this effect runs only on mount/unmount

  useEffect(() => {
    // Only set up back button handling for mobile devices
    if (isMobile && isSelected) {
      // Push a state to the browser history when a chat is selected on mobile
      window.history.pushState(
        { chatSelected: true },
        "",
        window.location.pathname
      );

      // Function to handle back button press
      const handlePopState = (event) => {
        // Clear the selected chat when back button is pressed
        dispatch(clearSelectedChat());
        console.log("Back button pressed, chat selection cleared");
      };

      // Add event listener for the popstate event (triggered by back button)
      window.addEventListener("popstate", handlePopState);

      // Clean up event listener when component unmounts or dependencies change
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isMobile, isSelected, dispatch]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Filter profiles based on search text
  const filteredProfiles =
    searchText.trim() === ""
      ? sidebarAllUsersProfile
      : sidebarAllUsersProfile.filter((profile) => {
          const searchLower = searchText.toLowerCase();
          return (
            profile.FullName.toLowerCase().includes(searchLower) ||
            profile.Email.toLowerCase().includes(searchLower)
          );
        });

  return (
    <>
      <div className="w-full justify-center items-end py-[5px] h-[calc(100vh-99px)] md:px-[15px] flex gap-[10px] overflow-hidden">
        {!isUserLoggedIn ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div
              className="px-[15px] py-[20px] text-[#414651] text-[19px] md:text-[20px] font-bold font-inter w-fit mx-auto mt-[100px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5]"
              style={{ wordSpacing: "5px" }}
            >
              Please{" "}
              <span className="text-blue-500">
                <Link to="/login">login</Link>
              </span>
              ! to see use Whatsapp
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="w-full justify-center items-end py-[5px] h-[calc(100vh-95px)] md:px-[15px] px-[8px] flex gap-[10px] overflow-hidden pt-[15px] pb-[30px] md:pb-[5px]">
            <div
              className={`${
                isSelected ? "hidden" : "block"
              } md:block w-full md:w-[400px] flex-shrink-0 flex flex-col items-center justify-center rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[5px] py-[10px] gap-[16px] h-full min-h-0 overflow-hidden md:flex-none `}
            >
              <div className="w-full flex justify-center">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="flex flex-col gap-[10px] overflow-y-auto h-full thin-scrollbar px-[5px] md:pb-[50px] w-full ">
                {filteredProfiles.map((profile) => (
                  <SidebarProfile
                    key={profile._id}
                    profileImage={profile.Avatar}
                    name={profile.FullName}
                    email={profile.Email}
                    userId={profile._id}
                  />
                ))}
              </div>
            </div>
            <div
              className={`${
                isSelected ? "block" : "hidden"
              } md:block w-full h-full overflow-hidden`}
            >
              <ChatDemo />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Whatsapp;
