import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true, // 로그인 상태 가정
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    dummyLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// 실제 미구현된 logoutUsingToken 대신 더미 사용
export const logoutUsingToken = tokenSlice.actions.dummyLogout;

export default tokenSlice.reducer;
