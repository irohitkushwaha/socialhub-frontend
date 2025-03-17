import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faWhatsapp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHistory,
  faThumbsUp,
  faUsers,
  faVideo,
  faImage,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

// Main Navigation Item Component
const MainNavItem = ({ icon, text, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 pl-4 py-2 w-[200px]  rounded-[8px] border border-[#D5D7DA] shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] transition-colors ${
      isSelected
        ? "bg-[#F0F0F0] font-semibold"
        : "bg-white hover:bg-[#F5F5F5]/50"
    }`}
  >
    {typeof icon === "string" ? (
      <span className="material-icons-outlined w-10 h-10 text-green-600">
        {icon}
      </span>
    ) : (
      <FontAwesomeIcon icon={icon} className="text-[26px] text-green-600" />
    )}
    <span className="text-[20px] text-[#414651] font-semibold">{text}</span>
  </button>
);

// Sub Navigation Item Component
const SubNavItem = ({ icon, text, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 p-2 pl-4  w-[190px] rounded-[8px] border border-[#D5D7DA] shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] transition-colors ${
      isSelected
        ? "bg-[#F0F0F0] font-semibold"
        : "bg-white hover:bg-[#F5F5F5]/50"
    }`}
  >
    {typeof icon === "string" ? (
      <span className="material-icons-outlined text-[22px] text-green-600">
        {icon}
      </span>
    ) : (
      <FontAwesomeIcon icon={icon} className="text-[22px] text-green-600" />
    )}
    <span className="text-[16px] text-[#414651] font-semibold">{text}</span>
  </button>
);

// Navigation data
const navItems = [
  {
    id: "youtube",
    icon: faYoutube,
    text: "YouTube",
    subItems: [
      { id: "history", icon: faHistory, text: "Watch History" },
      { id: "liked", icon: faThumbsUp, text: "Liked Videos" },
      { id: "subscribed", icon: "person_add", text: "Subscribed" },
      { id: "subscribedto", icon: "group", text: "Subscribed To" },
    ],
  },
  {
    id: "instagram",
    icon: faInstagram,
    text: "Instagram",
    subItems: [
      { id: "reels", icon: "broken_image", text: "Posts" },
      { id: "posts", icon: "travel_explore", text: "Watched Reels" },
      { id: "savedreels", icon: "collections_bookmark", text: "Saved Reels" },
    ],
  },
  {
    id: "whatsapp",
    icon: faWhatsapp,
    text: "WhatsApp",
    subItems: [], // No subitems
  },
  {
    id: "twitter",
    icon: faTwitter,
    text: "Twitter",
    subItems: [{ id: "bookmarks", icon: faBookmark, text: "Bookmarks" }],
  },
];

// Main SideNav Component
const SideNav = () => {
  // State for selected main nav item (default: youtube)
  const [selectedNav, setSelectedNav] = useState("youtube");
  // State for selected sub nav item
  const [selectedSubNav, setSelectedSubNav] = useState("");

  // Handle main nav item click
  const handleMainNavClick = (id) => {
    if (selectedSubNav !== "") {
      // If a submenu item is selected, clear it
      setSelectedSubNav("");
    }
    setSelectedNav(id);
  };

  // Handle sub nav item click
  const handleSubNavClick = (id) => {
    setSelectedSubNav(id);
  };

  return (
    <div class="lg:border-r-2 lg:border-[#D5D7DA] lg:h-screen">
       <div className="w-fit flex flex-col gap-5 lg:border-r h-fit py-3 px-6 rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_6px_#F5F5F5] lg:shadow-none lg:border-none">
      {/* Main Nav Items */}
      {navItems.map((item) => (
        <div class="flex flex-col gap-4" key={item.id}>
          <MainNavItem
            icon={item.icon}
            text={item.text}
            isSelected={selectedNav === item.id && selectedSubNav === ""}
            onClick={() => handleMainNavClick(item.id)}
          />

          {/* Sub Nav Items - Only show for selected main nav */}
          {selectedNav === item.id && item.subItems.length > 0 && (
            <div className="mt-1 mb-2 pl-10 flex flex-col gap-3">
              {item.subItems.map((subItem) => (
                <SubNavItem
                  key={subItem.id}
                  icon={subItem.icon}
                  text={subItem.text}
                  isSelected={selectedSubNav === subItem.id}
                  onClick={() => handleSubNavClick(subItem.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
   
  );
};

export default SideNav;
