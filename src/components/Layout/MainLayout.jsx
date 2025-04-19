import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import SideNav from "./SideNav/SideNav";
import MobileHeader from "./Header/MobileHeader";
// import MobileHeader from "./Header/MobileHeader";
// import MobileSideNav from "./SideNav/MobileSideNav";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ScrollToTop from "../utils/ScrollToTop";

// Layout configuration for different routes
const routeConfig = {
  // YouTube routes
  "/": { header: true, sideNav: true, searchBar: true, upload: true },
  "/youtube/search": {
    header: true,
    sideNav: true,
    searchBar: true,
    upload: true,
  },

  "/youtube/upload-videos": {
    header: true,
    sideNav: true,
    searchBar: false,
    upload: false,
  },
  "/youtube/watch-history": {
    header: true,
    sideNav: true,
    searchBar: false,
    upload: true,
  },
  "/youtube/liked-videos": {
    header: true,
    sideNav: true,
    searchBar: false,
    upload: true,
  },
  "/youtube/subscribers-list": {
    header: true,
    sideNav: true,
    searchBar: false,
    upload: true,
  },
  "/youtube/subscribed-to": {
    header: true,
    sideNav: true,
    searchBar: false,
    upload: true,
  },
  "/youtube/playing": {
    header: true,
    sideNav: true,
    searchBar: true,
    upload: true,
  },
  "/youtube/shorts": {
    header: true,
    sideNav: false,
    searchBar: false,
    upload: true,
  },
  // Instagram routes
  "/instagram": { header: true, sideNav: true, searchBar: false, upload: true },
  "/instagram/reels": {
    header: true,
    sideNav: false,
    searchBar: false,
    upload: true,
  },

  // WhatsApp routes
  "/whatsapp": { header: true, sideNav: true, searchBar: true, upload: false },
  "/whatsapp/chat": {
    header: true,
    sideNav: true,
    searchBar: false,
    upload: false,
  },

  // Auth routes
  "/login": { header: true, sideNav: true, searchBar: true, upload: true },
  "/signup": { header: true, sideNav: true, searchBar: true, upload: true },
};

const MainLayout = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  // Scroll to top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Get config for current route, fallback to default config
  const currentPath = location.pathname;
  const config = routeConfig[currentPath] || {
    header: true,
    sideNav: true,
    searchBar: true,
    upload: false,
  };

  return (
    <div className="flex flex-col relative">
      {/* Add ScrollToTop component to handle scroll reset on navigation */}
      <ScrollToTop />

      <div className="fixed top-[88px] left-[29px] z-50 md:hidden">
        {config.sideNav && isSideNavOpen && (
          <SideNav onClickNav={toggleSideNav} />
        )}
      </div>
      {/* Header is now fixed positioned, so we don't include it in the flex flow */}
      {config.header &&
        (isMobile ? (
          <MobileHeader
            showSearchBar={config.searchBar}
            upload={config.upload}
            isSideNavOpen={isSideNavOpen}
            onToggleSideNav={toggleSideNav}
          />
        ) : (
          <Header showSearchBar={config.searchBar} upload={config.upload} />
        ))}

      {/* Add padding to account for the fixed header height */}
      <div
        className={`md:grid md:pt-22 pt-18   ${
          config.sideNav ? "md:grid-cols-[auto_1fr]" : "grid-cols-1"
        }`}
      >
        <div className="hidden md:block md:sticky md:top-22 md:self-start md:h-screen">
          {config.sideNav && !isMobile && <SideNav />}
        </div>

        <main
          className={` overflow-auto  md:pt-[0px] pb-[50px] ${
            !config.sideNav ? "w-full" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
