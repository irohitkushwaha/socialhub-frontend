import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCommentOpen: false,
  activeItemId: null, // Will store either post ID or video ID
  itemType: null, // 'post' or 'video' to distinguish between them
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    openComment: (state, action) => {
      console.log(
        "openComment action dispatched, setting isCommentOpen to true"
      );
      const { id, type } = action.payload;

      state.isCommentOpen = true;
      state.activeItemId = id;
      state.itemType = type;
    },
    closeComment: (state) => {
      console.log(
        "closeComment action dispatched, setting isCommentOpen to false"
      );

      state.isCommentOpen = false;
      state.activeItemId = null;
      state.itemType = null;
    },
  },
});

export const { openComment, closeComment } = commentSlice.actions;


export const selectActiveItemId = (state) => state.comment.activeItemId;
export const selectIsCommentOpen = (state) => state.comment.isCommentOpen;
export const selectItemType = (state) => state.comment.itemType;


export default commentSlice.reducer;
