import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";

// YouTube pages
import YtHomepage from "./Pages/YtHomepage";
import YtSearch from "./Pages/YtSearch";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import YtUpload from "./Pages/YtUpload";
import YtWatchHistory from "./Pages/YtWatchHistory";
import LikedVideos from "./Pages/LikedVideos";
import Subscribers from "./Pages/Subscribers";
import SubscribedTo from "./Pages/SubscribedTo";
import Instagram from "./Pages/Instagram";
import YtPlaying from "./Pages/YtPlaying";
import ChannelDetail from "./Pages/ChannelDeatail";
import WatchedReels from "./Pages/WatchedReels";
import SavedReels from "./Pages/SavedReels";
import Whatsapp from "./Pages/Whatsapp";
import InstagramPosts from "./Pages/InstagramPosts";
import ReelUpload from "./Pages/ReelUpload";
import PostUpload from "./Pages/PostUploading";
import SingleReel from "./Pages/SingleReel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          // YouTube routes
          {
            index: true,
            element: <YtHomepage />,
          },
          {
            path: "youtube/search",
            element: <YtSearch />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "youtube/upload-videos",
            element: <YtUpload />,
          },
          {
            path: "youtube/watch-history",
            element: <YtWatchHistory />,
          },
          {
            path: "youtube/liked-videos",
            element: <LikedVideos />,
          },
          {
            path: "youtube/subscribers-list",
            element: <Subscribers />,
          },
          {
            path: "youtube/subscribed-to",
            element: <SubscribedTo />,
          },
          {
            path: "instagram",
            element: <Instagram />,
          },
          {
            path: "instagram/reels/:videoid",
            element: <SingleReel />,
          },
          {
            path: "youtube/playing/:videoid",
            element: <YtPlaying />,
          },
          {
            path: "youtube/channel-detail",
            element: <ChannelDetail />,
          },
          {
            path: "instagram/watched-reels",
            element: <WatchedReels />,
          },
          {
            path: "instagram/saved-reels",
            element: <SavedReels />,
          },
          {
            path: "whatsapp",
            element: <Whatsapp />,
          },

          {
            path: "instagram/posts",
            element: <InstagramPosts />,
          },
          {
            path : "instagram/reel/upload",
            element : <ReelUpload/>
          },
          {
            path : "instagram/post/upload",
            element : <PostUpload/>
          }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <YtSearch /> */}
    <RouterProvider router={router} />
  </Provider>
);
