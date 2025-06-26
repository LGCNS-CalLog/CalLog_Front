import { createSlice } from "@reduxjs/toolkit";

const initialState = { searchText: "" };

export const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.searchText = action.payload;
    },
    clearKeyword: (state) => {
      state.searchText = "";
    },
  },
});

export const { setKeyword, clearKeyword } = keywordSlice.actions;

export default keywordSlice.reducer;
