// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("user");
const initialStateUser = storedUser ? JSON.parse(storedUser) : null;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialStateUser,
    isAuthenticated: !!localStorage.getItem("user"),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
