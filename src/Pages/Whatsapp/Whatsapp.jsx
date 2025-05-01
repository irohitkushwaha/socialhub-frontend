import React, { useEffect } from "react";
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

function Whatsapp() {
  //h-[calc(100vh-100px)]

  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isSelected = useSelector(selectChatIsSelected);

  // Auto-select the first profile when component mounts
  useEffect(() => {
    if (!isMobile) {
      if (sampleSidebarProfiles.length > 0) {
        const firstProfile = sampleSidebarProfiles[0];
        // Select the first profile by default
        dispatch(
          selectChat({
            id: firstProfile.userId,
            name: firstProfile.name,
            email: firstProfile.email,
            profileImage: firstProfile.profileImage,
          })
        );
        console.log("Auto-selected first profile:", firstProfile.name);
      }
    }
  }, [dispatch, isMobile, sampleSidebarProfiles]);

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
            {sampleSidebarProfiles.map((profile) => (
              <SidebarProfile
                key={profile.userId}
                profileImage={profile.profileImage}
                name={profile.name}
                email={profile.email}
                userId={profile.userId}
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

const sampleSidebarProfiles = [
  {
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Smith",
    email: "john.smith@example.com",
    userId: "user1234",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    userId: "user2345",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    userId: "user3456",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    userId: "user4567",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "William Wilson",
    email: "william.wilson@example.com",
    userId: "user5678",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    userId: "user6789",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "James Anderson",
    email: "james.anderson@example.com",
    userId: "user7890",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Charlotte Thomas",
    email: "charlotte.thomas@example.com",
    userId: "user8901",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Benjamin Jackson",
    email: "benjamin.jackson@example.com",
    userId: "user9012",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "Amelia White",
    email: "amelia.white@example.com",
    userId: "user0123",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Lucas Harris",
    email: "lucas.harris@example.com",
    userId: "user1236",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Mia Clark",
    email: "mia.clark@example.com",
    userId: "user2347",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/13.jpg",
    name: "Henry Lewis",
    email: "henry.lewis@example.com",
    userId: "user3458",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/14.jpg",
    name: "Evelyn Walker",
    email: "evelyn.walker@example.com",
    userId: "user4569",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
    name: "Alexander Hall",
    email: "alexander.hall@example.com",
    userId: "user5670",
  },
];

export default Whatsapp;
