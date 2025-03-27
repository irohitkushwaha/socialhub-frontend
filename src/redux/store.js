import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "./slices/shareSlice";

export const store = configureStore({
  reducer: {
    share: shareReducer,
  },
});

export default store;
