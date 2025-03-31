import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelected: false,
  chatData: {
    id: null,
    name: null,
    email: null,
    profileImage: null,
  },
};

const sidebarChatSlice = createSlice({
  name: "sidebarChat",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      // Set selection state to true
      state.isSelected = true;
      // Store the chat data
      state.chatData = action.payload;
    },
    clearSelectedChat: (state) => {
      // Set selection state to false
      state.isSelected = false;
      // Clear the chat data
      state.chatData = {
        id: null,
        name: null,
        email: null,
        profileImage: null,
      };
    },
  },
});

// Export actions
export const { selectChat, clearSelectedChat } = sidebarChatSlice.actions;

// Selectors
export const selectChatData = (state) => state.sidebarChat.chatData;
export const selectChatIsSelected = (state) => state.sidebarChat.isSelected;

export default sidebarChatSlice.reducer;
