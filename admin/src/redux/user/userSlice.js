import { createSlice } from "@reduxjs/toolkit";
export const users = createSlice({
  name: "users",
  initialState: {
    user: {
      data: null,
    },
    current: {
      data: null,
    },
    all: {
      data: [],
      total: null,
    },
  },
  reducers: {
    allUser: (state, action) => {
      state.all = action.payload;
    },
    getUserById: (state, action) => {
      state.user.data = action.payload;
    },
    deleteUserByIdById: (state, action) => {
      state.user.data = action.payload;
    },
    updateUserByIdById: (state, action) => {
      state.user.data = action.payload;
    },
    login: (state, action) => {
      state.current.data = action.payload;
    },
    logout: (state) => {
      state.current.data = null;
    },
  },
});
export const {
  allUser,
  getUserById,
  deleteUserByIdById,
  updateUserByIdById,
  login,
  logout,
} = users.actions;
export default users.reducer;
