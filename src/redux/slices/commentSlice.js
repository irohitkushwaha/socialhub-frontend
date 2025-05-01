import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCommentOpen: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    openComment: (state) => {
      state.isCommentOpen = true;
    },
    closeComment: (state) => {
      state.isCommentOpen = false;
    },
  },
});

export const { openComment, closeComment } = commentSlice.actions;

export const selectIsCommentOpen = (state) => state.comment.isCommentOpen;

export default commentSlice.reducer;
