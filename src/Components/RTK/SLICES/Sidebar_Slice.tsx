import { createSlice } from "@reduxjs/toolkit";

const IntialState = {
  isOpen: false,
  count: 1,
};

const Sidebar_Slice = createSlice({
  name: "SIDEBAR",
  initialState: IntialState,
  reducers: {
    openMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },

    Increment: (state) => {
      state.count = state.count + 1;
    },
    Decrement: (state) => {
      state.count = state.count - 1;
    },
  },
});

export const { openMenu, closeMenu, Increment, Decrement } = Sidebar_Slice.actions;

export default Sidebar_Slice.reducer;
