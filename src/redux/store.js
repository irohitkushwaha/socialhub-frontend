import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "./slices/shareSlice";
import autoScrollReducer from "./slices/autoScrollSlice";

export const store = configureStore({
  reducer: {
    share: shareReducer,
    autoScroll: autoScrollReducer,
  },
});

export default store;
