import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/index";

const initialState = {
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  foodList: [],
  totalCount: 0,
  hasMore: true,
};

// 비동기 thunk 함수
export const fetchFoodInfo = createAsyncThunk(
  "foodInfo/fetch",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response = await apiClient.get("/diet/food", {
        params: payload,
      });

      if (response.data && response.data.code === "OK") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "음식 검색에 실패했습니다");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "음식 검색 실패";
      return rejectWithValue(errorMessage);
    }
  }
);

const foodInfoSlice = createSlice({
  name: "foodInfo",
  initialState,
  reducers: {
    resetFoodInfoState: (state) => {
      state.status = "idle";
      state.error = null;
      state.foodList = [];
      state.totalCount = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFoodInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("payload:", action.payload);

        // 서버 반환에 맞게 필드명 수정
        const { content: foodList, totalElements: totalCount } = action.payload;

        // 배열인지 확인 (안전하게)
        if (Array.isArray(foodList)) {
          state.foodList = [...state.foodList, ...foodList];
        } else {
          state.foodList = [...state.foodList]; // 또는 빈 배열로 처리
        }

        state.totalCount = totalCount ?? 0;
        state.hasMore = totalCount > state.foodList.length;
        state.error = null;
      })
      .addCase(fetchFoodInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "음식 정보를 불러오는 중 오류가 발생했습니다.";
      });
  },
});

export const { resetFoodInfoState } = foodInfoSlice.actions;

export default foodInfoSlice.reducer;
