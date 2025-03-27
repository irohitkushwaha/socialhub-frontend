import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShareModalOpen: false,
  shareData: {
    url: "",
    title: "",
  },
};

export const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    openShareModal: (state, action) => {
      state.isShareModalOpen = true;
      state.shareData = action.payload || state.shareData;
    },
    closeShareModal: (state) => {
      state.isShareModalOpen = false;
    },
  },
});

// Export actions
export const { openShareModal, closeShareModal } = shareSlice.actions;

// Export selectors
export const selectIsShareModalOpen = (state) => state.share.isShareModalOpen;
export const selectShareData = (state) => state.share.shareData;

// Export reducer
export default shareSlice.reducer;
