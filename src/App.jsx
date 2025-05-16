import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { markUserInteracted } from "./redux/slices/userInteractionSlice";
import { loggedin, loggedout } from "./redux/slices/authentication.slice";
import { userService } from "./Services/api/User.Service";
import  socket from "./Services/socket/SocketServices"
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useffect runned")
    const checkAuth = async () => {
      try {
        const apiUser = await userService.getCurrentUser();
        console.log("user fecthed and logged ", apiUser)
        const user = {
          id: apiUser._id || null,
          name: apiUser.FullName || null,
          email: apiUser.Email || null,
          avatar: apiUser.Avatar || null,
          username: apiUser.UserName || null,
        };
        dispatch(loggedin(user));
      } catch (error) {
        dispatch(loggedout());
        console.log("user logout")
      }
    };
    checkAuth();
  }, []);

  // Set up global interaction listeners
  useEffect(() => {
    const handleInteraction = () => {
      console.log(
        "in the app.jsx user interacted value is broooooooooooooo brooooooooooooooo"
      );
      dispatch(markUserInteracted());
      console.log(
        "in the app.jsx user interacted value is Dispatchedddddddddddddddddddddddddddddddddddddddddddddd"
      );
    };
    console.log("in the app.jsx user not interacted");

    // Add all the same listeners from ReelPlayer, but at app level
    document.addEventListener("click", handleInteraction, { once: true });
    // document.addEventListener("touchstart", handleInteraction, { once: true });
    // document.addEventListener("keydown", handleInteraction, { once: true });
    // document.addEventListener("scroll", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };
  }, [dispatch]);

  console.log("hello i am from app.jsx");
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

export default App;
