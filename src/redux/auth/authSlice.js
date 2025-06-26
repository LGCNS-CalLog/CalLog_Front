import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function calculateBMR(age, gender, height, weight) {
  const parsedAge = parseInt(age, 10);
  const parsedHeight = parseFloat(height);
  const parsedWeight = parseFloat(weight);

  let calculatedBMR = 0;

  if (gender === "MALE") {
    calculatedBMR =
      66.47 + 13.75 * parsedWeight + 5 * parsedHeight - 6.76 * parsedAge;
  } else if (gender === "FEMALE") {
    calculatedBMR =
      655.1 + 9.56 * parsedWeight + 1.85 * parsedHeight - 4.68 * parsedAge;
  }

  const isValidInfo =
    !isNaN(parsedAge) &&
    !isNaN(parsedHeight) &&
    !isNaN(parsedWeight) &&
    (gender === "MALE" || gender === "FEMALE");

  return isValidInfo && isFinite(calculatedBMR) ? Math.round(calculatedBMR) : 0;
}

const initialState = {
  usernickName: "",
  age: null,
  gender: "",
  height: null,
  weight: null,
  bmr: null,
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
      state.bmr = calculateBMR(
        state.age,
        state.gender,
        state.height,
        state.weight
      );
    },
    logout: (state) => {
      state.usernickName = "";
      state.age = null;
      state.gender = "";
      state.height = null;
      state.weight = null;
      state.bmr = null;
    },
    updateWeight: (state, action) => {
      state.weight = action.payload;
      state.bmr = calculateBMR(
        state.age,
        state.gender,
        state.height,
        state.weight
      );
    },
    updateHeight: (state, action) => {
      state.height = action.payload;
      state.bmr = calculateBMR(
        state.age,
        state.gender,
        state.height,
        state.weight
      );
    },
  },
});

export const { login, logout, updateWeight, updateHeight } =
  authSlicecopy.actions;
export default authSlicecopy.reducer;
