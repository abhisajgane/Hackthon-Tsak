import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_Url } from "../../config";

// Define fetchUsers thunk with accessToken as argument
export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (accessToken) => {
    try {
      const response = await axios.get(`${Base_Url}/api/get/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
