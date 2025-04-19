import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "./slices/shareSlice";
import autoScrollReducer from "./slices/autoScrollSlice";
import userInteractionReducer from "./slices/userInteractionSlice";
export const store = configureStore({
  reducer: {
    share: shareReducer,
    autoScroll: autoScrollReducer,
    userInteraction: userInteractionReducer,
  },
});

export default store;
