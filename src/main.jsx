import React, { StrictMode } from "react";
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
import CommentListExample from "./components/CommentListExample.jsx";
import SeparatorExample from "./components/SeparatorExample.jsx";
import InputExample from "./components/InputExample.jsx";
import GoogleButtonExample from "./components/GoogleButtonExample.jsx";
import FlexibleButtonExample from "./components/FlexibleButtonExample.jsx";
import FileUploadUpdatedExample from "./components/FileUploadUpdatedExample.jsx";
import FormTitleExample from "./components/FormTitleExample.jsx";
import ToggleExample from "./components/ToggleExample.jsx";
import WatchHistoryVideoExample from "./components/watchhistoryvideoexample.jsx";
import ProfileImageExample from "./components/ProfileImageExample.jsx";
import ActionButton from "./components/ActionButton.jsx";
import CoverImageExample from "./components/CoverImageExample.jsx";
import SubscriberDetailExample from "./components/SubscriberDetailExample.jsx";
import ProfileViewExample from "./components/ProfileViewExample.jsx";
import EditIconExample from "./components/EditIconExample.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <EditIconExample />
      <ProfileViewExample />
      <SubscriberDetailExample />
      <CoverImageExample />
      <ActionButton icon="person" text="View Profile" iconType="material" />
      <ProfileImageExample />
      <WatchHistoryVideoExample />
      <ToggleExample />
      <FormTitleExample />
      <FileUploadUpdatedExample />
      <FlexibleButtonExample />
      <GoogleButtonExample />
      <InputExample />
      <SeparatorExample />
      <CommentListExample />
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
