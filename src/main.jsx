import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Youtubecomponent from "./youtubecomponent.jsx";
import ReelPlayerExample from "./InstagramComponents/ReelPlayerExample.jsx";
import VideoUserHeaderExample from "./components/VideoUserHeaderExample.jsx";
import ShareModalExample from "./components/ShareModalExample.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
// import WatchedReels from "./components/WatchedReels.jsx";
// import PostAction from "./components/PostAction.jsx";
// import PostDetailsExample from "./components/PostDetailsExample.jsx";
// import InstagramPostImage from "./components/InstagramPostImage.jsx";
// import postimage from "./assets/watch/watch1.jpg";
import InstagramPostProfile from "./InstagramComponents/InstagramPostcomponents/InstagramPostProfile.jsx";
import InstagramPost from "./InstagramComponents/InstagramPost.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <Provider store={store}>
        <InstagramPost />
        {/* <InstagramPostProfile /> */}
        {/* <div className="flex items-center justify-center h-screen w-full">
          <InstagramPostImage imageUrl={postimage} />
        </div> */}
        {/* <PostDetailsExample /> */}
        {/* <PostAction /> */}
        {/* <WatchedReels /> */}
        {/* <ShareModalExample /> */}
        {/* <VideoUserHeaderExample /> */}
        {/* <ReelPlayerExample /> */}
        {/* <Youtubecomponent />
      <App /> */}
        {/* <ReelActionExample /> */}
      </Provider>
    </>
  </StrictMode>
);
