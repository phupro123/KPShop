import { createSlice } from "@reduxjs/toolkit";
export const common = createSlice({
  name: "common",
  initialState: {
    isCollapsed: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});
export const { toggleSidebar } = common.actions;
export default common.reducer;
