import React, { useEffect, useState } from "react";
import ChatDemo from "../../components/Whatsapp/Containers/ChatDemo";
import SidebarProfile from "../../components/Whatsapp/Components/SidebarProfile";
import SearchBar from "../../components/Whatsapp/Components/SearchBar";
import "./Whatsapp.css"; // Import custom CSS for scrollbar styling
import { useDispatch, useSelector } from "react-redux";
import {
  selectChat,
  selectChatIsSelected,
  clearSelectedChat,
} from "../../redux/slices/sidebarChatSlice";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { chatService } from "../../Services/api/Chat.Service";

function Whatsapp() {
  //h-[calc(100vh-100px)]

  const [sidebarAllUsersProfile, setSidebarAllUsersProfile] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await chatService.getAllUsers();
      console.log("response sidebarbarprofile is", response);

      setSidebarAllUsersProfile(response);
    } catch (error) {
      console.log("error of response sidebarbarprofile is", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

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

  return (
    <>
      <div className="w-full justify-center items-end py-[5px] h-[calc(100vh-95px)] px-[15px]  flex gap-[10px] overflow-hidden">
        <div
          className={`${
            isSelected ? "hidden" : "block"
          } md:block w-fit flex flex-col items-center rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] px-[5px] py-[10px] gap-[16px] h-full min-h-0`}
        >
          <SearchBar />
          <div className="flex flex-col gap-[10px] overflow-y-auto h-full thin-scrollbar px-[5px]">
            {sidebarAllUsersProfile.map((profile) => (
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
          } md:block w-full h-full`}
        >
          <ChatDemo />
        </div>
      </div>
    </>
  );
}

export default Whatsapp;
