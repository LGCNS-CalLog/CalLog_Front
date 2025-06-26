import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { injectStore } from "../api/index";

// localStorage 저장
import storage from "redux-persist/lib/storage";

//slice 파일들
import tokenSlice from "./Token/tokenSlice";
import registrationSlice from "./registration/registrationSlice";
import authSlice from "./auth/authSlice";
import keywordSlice from "./keyword/keywordSlice";
import foodInfoSlice from "./foodInfo/foodInfoSlice";
import meaalInputSlice from "./mealInput/mealInputSlice";

// 여러 리듀서를 합치는 경우 (지금은 하나지만 확장성 고려)
const rootReducer = combineReducers({
  token: tokenSlice,
  registration: registrationSlice,
  auth: authSlice,
  keyword: keywordSlice,
  foodInfo: foodInfoSlice,
  mealInput: meaalInputSlice,
});

// persist 설정
const persistConfig = {
  key: "root",
  storage,
};

// persist reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store 생성
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 관련 경고 제거
    }),
});

injectStore(store); // 🔥 여기 한 줄 추가

// persistor 생성
export const persistor = persistStore(store);
