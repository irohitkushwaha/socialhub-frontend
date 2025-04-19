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
// import YtWatchPage from "./Pages/YtWatchPage/YtWatchPage";
// import YtShortsPage from "./Pages/YtShortsPage/YtShortsPage";

// Instagram pages
// import InstaHomepage from "./Pages/InstaHomepage/InstaHomepage";
// import InstaReelsPage from "./Pages/InstaReelsPage/InstaReelsPage";

// // WhatsApp pages
// import WhatsappHomepage from "./Pages/WhatsappHomepage/WhatsappHomepage";
// import WhatsappChatPage from "./Pages/WhatsappChatPage/WhatsappChatPage";

// // Auth pages
// import LoginPage from "./Pages/Auth/LoginPage";
// import SignupPage from "./Pages/Auth/SignupPage";

// // 404 page
// import NotFoundPage from "./Pages/NotFoundPage";

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
            element: <Signup/>,
          },
          {
            path: "youtube/upload-videos",
            element: <YtUpload/>,
          },
          {
            path: "youtube/watch-history",
            element: <YtWatchHistory/>,
          },
          {
            path: "youtube/liked-videos",
            element: <LikedVideos/>,
          },
          {
            path: "youtube/subscribers-list",
            element: <Subscribers/>,
          },
          {
            path: "youtube/subscribed-to",
            element: <SubscribedTo/>,
          },
          {
            path: "instagram",
            element: <Instagram/>,
          },
          {
            path: "youtube/playing",
            element: <YtPlaying />,
          },
          // {
          //   path: "youtube/watch/:videoId",
          //   element: <YtWatchPage />,
          // },
          // {
          //   path: "youtube/shorts",
          //   element: <YtShortsPage />,
          // },

          // // Instagram routes
          // {
          //   path: "instagram",
          //   element: <InstaHomepage />,
          // },
          // {
          //   path: "instagram/reels",
          //   element: <InstaReelsPage />,
          // },

          // // WhatsApp routes
          // {
          //   path: "whatsapp",
          //   element: <WhatsappHomepage />,
          // },
          // {
          //   path: "whatsapp/chat/:chatId",
          //   element: <WhatsappChatPage />,
          // },

          // // Auth routes
          // {
          //   path: "login",
          //   element: <LoginPage />,
          // },
          // {
          //   path: "signup",
          //   element: <SignupPage />,
          // },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <YtSearch /> */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
