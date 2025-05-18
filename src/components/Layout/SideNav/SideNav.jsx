import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
const MainNavItem = ({ icon, text, isSelected, onClick, to }) => (
  <Link
    to={to || "#"}
    onClick={(e) => {
      // Just call onClick without passing the event
      // This prevents any interference with event bubbling
      onClick();
    }}
    className={`flex items-center gap-2 pl-4 py-2 w-[200px] rounded-[8px] border border-[#D5D7DA] shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] transition-colors ${
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
  </Link>
);

// const MainNavItem = ({ icon, text, isSelected, onClick, to }) => (
//   <button
//     className={`flex items-center gap-2 pl-4 py-2 w-[200px] rounded-[8px] border border-[#D5D7DA] shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] transition-colors ${
//       isSelected
//         ? "bg-[#F0F0F0] font-semibold"
//         : "bg-white hover:bg-[#F5F5F5]/50"
//     }`}
//     onClick={onClick}
//   >
//     {typeof icon === "string" ? (
//       <span className="material-icons-outlined w-10 h-10 text-green-600">
//         {icon}
//       </span>
//     ) : (
//       <FontAwesomeIcon icon={icon} className="text-[26px] text-green-600" />
//     )}
//     <span className="text-[20px] text-[#414651] font-semibold">{text}</span>
//   </button>
// );

// Sub Navigation Item Component
const SubNavItem = ({ icon, text, isSelected, onClick, to }) => (
  <Link
    to={to || "#"}
    onClick={(e) => {
      // Just call onClick without passing the event
      // This ensures the event will continue to bubble up naturally
      onClick();
    }}
    className={`flex items-center gap-2 p-2 pl-4 w-[190px] rounded-[8px] border border-[#D5D7DA] shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] transition-colors ${
      isSelected
        ? "bg-[#F0F0F0] font-semibold"
        : "bg-white hover:bg-[#F5F5F5]/50"
    }`}
  >
    {typeof icon === "string" ? (
      <span className="material-icons-outlined text-[22px] text-green-600">
        {icon}
      </span>
    ) : React.isValidElement(icon) ? (
      React.cloneElement(icon, {
        className: "w-6 h-6",
        fill: "#16a34a", // text-green-600 equivalent
      })
    ) : (
      <FontAwesomeIcon icon={icon} className="text-[22px] text-green-600" />
    )}
    <span className="text-[16px] text-[#414651] font-semibold">{text}</span>
  </Link>
);

// Navigation data
const navItems = [
  {
    id: "youtube",
    icon: faYoutube,
    text: "YouTube",
    link: "/",
    subItems: [
      {
        id: "history",
        icon: faHistory,
        text: "Watch History",
        link: "/youtube/watch-history",
      },
      {
        id: "liked",
        icon: faThumbsUp,
        text: "Liked Videos",
        link: "/youtube/liked-videos",
      },
      {
        id: "subscribers",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z" />
          </svg>
        ),
        text: "Subscribers",
        link: "/youtube/subscribers-list",
      },
      {
        id: "subscribedto",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" />
          </svg>
        ),
        text: "Subscribed To",
        link: "/youtube/subscribed-to",
      },
    ],
  },
  {
    id: "instagram",
    icon: faInstagram,
    text: "Instagram",
    link: "/instagram",
    subItems: [
      {
        id: "reels",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-4.58l.99.99 4-4 4 4 4-3.99L19 12.43V19zm0-9.41l-1.01-1.01-4 4.01-4-4-4 4-.99-1V5h14v4.59z" />
          </svg>
        ),
        text: "Posts",
        link: "/instagram/posts",
      },
      {
        id: "posts",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <rect fill="none" height="24" width="24" />
            <path d="M19.3,16.9c0.4-0.7,0.7-1.5,0.7-2.4c0-2.5-2-4.5-4.5-4.5S11,12,11,14.5s2,4.5,4.5,4.5c0.9,0,1.7-0.3,2.4-0.7l3.2,3.2 l1.4-1.4L19.3,16.9z M15.5,17c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S16.9,17,15.5,17z M12,20v2 C6.48,22,2,17.52,2,12C2,6.48,6.48,2,12,2c4.84,0,8.87,3.44,9.8,8h-2.07c-0.64-2.46-2.4-4.47-4.73-5.41V5c0,1.1-0.9,2-2,2h-2v2 c0,0.55-0.45,1-1,1H8v2h2v3H9l-4.79-4.79C4.08,10.79,4,11.38,4,12C4,16.41,7.59,20,12,20z" />
          </svg>
        ),
        text: "Watched Reels",
        link: "/instagram/watched-reels",
      },
      {
        id: "savedreels",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 2v5l-1-.75L15 9V4h2zm3 12H8V4h5v9l3-2.25L19 13V4h1v12z" />
          </svg>
        ),
        text: "Saved Reels",
        link: "/instagram/saved-reels",
      },
    ],
  },
  {
    id: "whatsapp",
    icon: faWhatsapp,
    text: "WhatsApp",
    link: "/whatsapp",
    subItems: [], // No subitems
  }
];

// Main SideNav Component
const SideNav = ({ onClickNav }) => {
  const location = useLocation();

  // Add a document click handler to capture all clicks
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // You can do something with clicks at the document level here
      console.log("Document click detected");
    };

    // Add event listener
    document.addEventListener("click", handleDocumentClick);

    // Clean up
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // State for selected main nav item (default: youtube)
  const [selectedNav, setSelectedNav] = useState("youtube");
  // State for selected sub nav item
  const [selectedSubNav, setSelectedSubNav] = useState("");

  useEffect(() => {
    const path = location.pathname;
    let foundMatch = false;

    // Check for sub-item routes first
    for (const item of navItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (path === subItem.link || path.startsWith(subItem.link + "/")) {
            setSelectedNav(item.id);
            setSelectedSubNav(subItem.id);
            foundMatch = true;
            return;
          }
        }
      }
    }

    // Then check main item routes
    for (const item of navItems) {
      if (path === item.link || path.startsWith(item.link + "/")) {
        setSelectedNav(item.id);
        setSelectedSubNav("");
        foundMatch = true;
        return;
      }
    }

    // If no match was found, clear the selection
    if (!foundMatch) {
      setSelectedNav("");
      setSelectedSubNav("");
    }
  }, [location.pathname]);

  // Handle main nav item click
  const handleMainNavClick = (id) => {
    if (selectedNav === id) {
      // If clicking already selected item, toggle sub items
      if (selectedSubNav !== "") {
        setSelectedSubNav("");
      }
    } else {
      // Otherwise, select this item and clear sub-item selection
      setSelectedNav(id);
      setSelectedSubNav("");
    }
    // Call the onClickNav function if provided
    if (typeof onClickNav === "function") {
      onClickNav();
    }
  };

  // Handle sub nav item click
  const handleSubNavClick = (id) => {
    setSelectedSubNav(id);
    // Call the onClickNav function if provided
    if (typeof onClickNav === "function") {
      onClickNav();
    }
  };

  return (
    <div className="lg:border-r-2 lg:border-[#D5D7DA] lg:h-screen overflow-hidden">
      <div className="w-fit flex flex-col gap-5 lg:border-r h-fit py-3 px-6 rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_6px_#F5F5F5] lg:shadow-none lg:border-none">
        {/* Main Nav Items */}
        {navItems.map((item) => (
          <div className="flex flex-col gap-4" key={item.id}>
            <MainNavItem
              icon={item.icon}
              text={item.text}
              isSelected={selectedNav === item.id && selectedSubNav === ""}
              onClick={() => handleMainNavClick(item.id)}
              to={item.link}
            />

            {/* Sub Nav Items - Only show for selected main nav */}
            {selectedNav === item.id &&
              item.subItems &&
              item.subItems.length > 0 && (
                <div className="mt-1 mb-2 pl-10 flex flex-col gap-3">
                  {item.subItems.map((subItem) => (
                    <SubNavItem
                      key={subItem.id}
                      icon={subItem.icon}
                      text={subItem.text}
                      isSelected={selectedSubNav === subItem.id}
                      onClick={() => handleSubNavClick(subItem.id)}
                      to={subItem.link}
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
