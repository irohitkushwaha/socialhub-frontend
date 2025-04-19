import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { markUserInteracted } from "./redux/slices/userInteractionSlice";
function App() {
  const dispatch = useDispatch();

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
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { once: true });

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

