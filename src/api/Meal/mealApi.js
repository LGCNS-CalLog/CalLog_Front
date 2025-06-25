import apiClient from "../index";

// 식사 등록
export const createMeal = (mealData) => {
  return apiClient.post("/diet/meal", mealData);
};

// 식사 수정
export const updateMeal = (updatedData) => {
  console.log(updatedData);
  return apiClient.post("/diet/meal/update", updatedData);
};

// 식사 삭제
export const deleteMeal = (mealId) => {
  console.log("delete", mealId);
  return apiClient.post("/diet/meal/delete", mealId);
};
