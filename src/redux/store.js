import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "./slices/shareSlice";
import autoScrollReducer from "./slices/autoScrollSlice";
import userInteractionReducer from "./slices/userInteractionSlice";
import commentReducer from "./slices/commentSlice";
import sidebarChatReducer from "./slices/sidebarChatSlice";
import authenticationReducer from "./slices/authentication.slice";

export const store = configureStore({
  reducer: {
    share: shareReducer,
    autoScroll: autoScrollReducer,
    userInteraction: userInteractionReducer,
    comment: commentReducer,
    sidebarChat: sidebarChatReducer,
    authentication: authenticationReducer,
  },
});

export default store;
