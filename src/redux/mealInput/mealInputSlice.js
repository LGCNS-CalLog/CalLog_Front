// src/store/mealInput/mealInputSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: "",
  selectedMealType: "",
  mealData: {},
};

const mealInputSlice = createSlice({
  name: "mealInput",
  initialState,
  reducers: {
    setMealInputContext: (state, action) => {
      const { date, mealType, mealInfo } = action.payload;
      state.selectedDate = date;
      state.selectedMealType = mealType;
      if (mealInfo) {
        state.mealData[mealType] = mealInfo;
      }
    },
  },
});

export const { setMealInputContext } = mealInputSlice.actions;
export default mealInputSlice.reducer;
