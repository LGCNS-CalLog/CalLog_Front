import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignUp } from "../../api/SignUp/signUpApi";

// 회원가입 비동기 작업
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await SignUp(userData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message); // 에러 메시지를 상태로 넘김
    }
  }
);

const initialState = {
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetRegistrationState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetRegistrationState } = registrationSlice.actions;
export default registrationSlice.reducer;
