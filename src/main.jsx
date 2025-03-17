import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppSliderRanges from "./AppSliderRanges.jsx";
import AppVideo from "./AppVideo.jsx";
import AppTitle from "./AppTitle.jsx";
import ChannelDetail from "./components/ChannelDetail.jsx";
import LikeDislike from "./components/LikeDislike.jsx";
import ButtonVideo from "./components/btnvideo.jsx";
import DescriptionExample from "./components/DescriptionExample.jsx";
import CommentCount from "./components/CommentCount.jsx";
import SummarizeCommentsExample from "./components/SummarizeCommentsExample.jsx";
import AddCommentExample from "./components/addcommentsexample.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <AddCommentExample />
      <SummarizeCommentsExample />
      <CommentCount />
      <DescriptionExample />
      <ButtonVideo icon="download" text="Download" />
      <LikeDislike initialLikes="200K" />
      <ChannelDetail />
      <AppTitle />
      {/* <AppVideo /> */}

      <AppSliderRanges />

      <App />
    </>
  </StrictMode>
);
