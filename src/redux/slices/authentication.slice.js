import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
  user: {
    id: null,
    name: null,
    email: null,
    avatar: null,
    username: null,
  },
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loggedin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loggedout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        id: null,
        name: null,
        email: null,
        avatar: null,
        username: null,
      };
    },
  },
});

export const { loggedin, loggedout } = authenticationSlice.actions;
export const isLoggedin = (state) => state.authentication.isAuthenticated;
export const getUserData = (state) => state.authentication.user;
export default authenticationSlice.reducer;
