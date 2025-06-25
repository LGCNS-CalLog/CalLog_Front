import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  usernickName: "",
  age: null,
  gender: "",
  height: null,
  weight: null,
};

const authSlicecopy = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.usernickName = action.payload.usernickName;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
    },
    logout: (state) => {
      state.usernickName = "";
      state.age = null;
      state.gender = "";
      state.height = null;
      state.weight = null;
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
