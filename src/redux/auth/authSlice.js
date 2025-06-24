import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  userid: "",
  height: "",
  weight: "",
  gender: "",
};

const authSlicecopy = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.userid = action.payload.userid;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.gender = action.payload.gender;
    },
    logout: (state) => {
      state.username = "";
      state.userid = "";
      state.height = "";
      state.weight = "";
      state.gender = "";
    },
    updateWeight: (state, action) => {
      state.weight = action.payload;
    },
    updateHeight: (state, action) => {
      state.height = action.payload;
    },
  },
});

export const { login, logout, updateWeight, updateHeight } =
  authSlicecopy.actions;
export default authSlicecopy.reducer;
