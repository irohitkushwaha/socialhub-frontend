import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAutoScrollEnabled: false,
};

export const autoScrollSlice = createSlice({
  name: "autoScroll",
  initialState,
  reducers: {
    toggleAutoScroll: (state) => {
      state.isAutoScrollEnabled = !state.isAutoScrollEnabled;
    },
  },
});

// Export actions
export const { toggleAutoScroll } = autoScrollSlice.actions;

// Export selector
export const selectIsAutoScrollEnabled = (state) =>
  state.autoScroll.isAutoScrollEnabled;

// Export reducer
export default autoScrollSlice.reducer;
