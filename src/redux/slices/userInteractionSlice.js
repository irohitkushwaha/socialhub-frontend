import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from 'react-redux';

const userInteractionSlice = createSlice({
  name: "userInteraction",
  initialState: {
    hasInteracted: false,
  },
  reducers: {
    markUserInteracted: (state) => {
      state.hasInteracted = true;
    },
  },
});

export const { markUserInteracted } = userInteractionSlice.actions;
export const selectHasInteracted = (state) =>
  state.userInteraction.hasInteracted;

// const TestingState = useSelector(selectHasInteracted)

console.log(
  "value from the selectHasInteracted from slice",
  selectHasInteracted
);

export default userInteractionSlice.reducer;
