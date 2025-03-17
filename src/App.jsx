import { useState } from "react";
import "./index.css";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import Button from "./components/button";
import ThumbnailCard from "./components/ThumbnailCard";
import SideNav from "./components/SideNav";
import SubscriberItem from "./components/SubscriberItem";
import FilterButton from "./components/FilterButton";
import thumbnail1 from "./assets/thumbnail1.webp";
import channelIcon from "./assets/channels4_profile.jpg";
function App() {
  // Format subscriber count

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Mobile SideNav (centered, only visible on mobile) */}
      <div className="w-full flex justify-center pt-10 pb-5 lg:hidden">
        <SideNav />
      </div>

      {/* Desktop SideNav (left-aligned, only visible on desktop) */}
      <div className="hidden lg:block h-full">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <Logo
            divClass="w-full"
            imgClass="w-12 h-12 mr-2"
            textClass="text-3xl font-bold"
          />

          {/* Search and Button */}
          <div className="flex gap-4 mt-4">
            <SearchBar />
            <Button />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mt-6">
            <FilterButton
              icon="filter_list"
              text="Filter"
              onClick={() => console.log("Filter clicked")}
            />
            <FilterButton
              icon="sort"
              text="Sort"
              onClick={() => console.log("Sort clicked")}
            />
          </div>

          {/* Content with ThumbnailCards and SubscriberItem */}
          <div className="w-full mt-8 flex flex-col lg:flex-row gap-6">
            {/* ThumbnailCards */}
            <div className="flex-1 flex flex-wrap gap-4 justify-center">
              <ThumbnailCard
                thumbnailSrc={thumbnail1}
                title="How to Build a React App in 10 Minutes"
                channelIcon={channelIcon}
                channelName="React Masters"
                views="50K"
                uploadTime="3 days ago"
                duration="9:20"
              />
              <ThumbnailCard
                thumbnailSrc={thumbnail1}
                title="How to Build a React App in 10 Minutes"
                channelIcon={channelIcon}
                channelName="React Masters"
                views="50K"
                uploadTime="3 days ago"
                duration="9:20"
              />
              <ThumbnailCard
                thumbnailSrc={thumbnail1}
                title="How to Build a React App in 10 Minutes"
                channelIcon={channelIcon}
                channelName="React Masters"
                views="50K"
                uploadTime="3 days ago"
                duration="9:20"
              />
            </div>

            {/* Subscriber Section */}
            <div className="lg:w-auto flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-[#181D27] mb-2 px-4">
                Top Subscribers
              </h2>

              <SubscriberItem
                profileImage="https://randomuser.me/api/portraits/women/44.jpg"
                name="Shradha Khapra"
                email="shradha@apnacollege.com"
                subscriberCount="9M"
              />

              <SubscriberItem
                profileImage="https://randomuser.me/api/portraits/men/32.jpg"
                name="Tanay Pratap"
                email="tanay@neogcamp.com"
                subscriberCount="500K"
              />

              <SubscriberItem
                profileImage="https://randomuser.me/api/portraits/men/45.jpg"
                name="Akshay Saini"
                email="akshay@namastejs.com"
                subscriberCount="1.2M"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
