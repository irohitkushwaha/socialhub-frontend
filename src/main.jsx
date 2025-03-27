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
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <Provider store={store}>
        {/* <ShareModalExample /> */}
        {/* <VideoUserHeaderExample /> */}
        {/* <ReelPlayerExample /> */}
        <Youtubecomponent />
      <App />
        {/* <ReelActionExample /> */}
      </Provider>
    </>
  </StrictMode>
);
