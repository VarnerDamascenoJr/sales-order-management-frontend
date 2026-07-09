import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isCommandMenuOpen: boolean;
};

const initialState: UiState = {
  isCommandMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCommandMenu(state) {
      state.isCommandMenuOpen = true;
    },
    closeCommandMenu(state) {
      state.isCommandMenuOpen = false;
    },
    toggleCommandMenu(state) {
      state.isCommandMenuOpen = !state.isCommandMenuOpen;
    },
  },
});

export const { openCommandMenu, closeCommandMenu, toggleCommandMenu } =
  uiSlice.actions;
export const uiReducer = uiSlice.reducer;
