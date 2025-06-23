import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/index";
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const initialState = {
  accessToken: accessToken,
  refreshToken: refreshToken,
  status: "idle",
  error: null,
  foodList: [],
  totalCount: 0,
  hasMore: true,
};

export const getfoodInfoByParam = createAsyncThunk(
  "foodinfo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/foodinfo", { params: payload });
      if (response.data && response.data.status === "SUCCESS") {
        return response.data;
      } else {
        throw new Error(response.data.message || "음식 검색에 실패했습니다");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login Failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const foodInfoSlice = createSlice({
  name: "foodinfo",
  initialState,
  reducers: {
    resetFoodInfoState: (state) => {
      state.status = initialState.status;
      state.error = initialState.error;
      state.foodList = initialState.foodList; // 빈 배열로 설정됨
      state.totalCount = initialState.totalCount; // 0으로 설정됨
      state.hasMore = initialState.hasMore; // true로 설정됨
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getfoodInfoByParam.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getfoodInfoByParam.fulfilled, (state, action) => {
        state.status = "succeeded";

        const responseItem = action.payload.data;

        state.foodList = [...state.foodList, ...responseItem.items]; // 수정된 아이템 리스트를 기존 리스트에 병합합니다.

        if (responseItem.total > state.foodList.length) {
          state.hasMore = true;
        } else {
          state.hasMore = false;
        }
        state.totalCount = responseItem.total;
        state.error = null;
      })
      .addCase(getfoodInfoByParam.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { resetFoodInfoState } = foodInfoSlice.actions;

export default foodInfoSlice.reducer;
