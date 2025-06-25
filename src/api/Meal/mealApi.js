import apiClient from "../index";

// 식사 등록
export const createMeal = async (mealData) => {
  try {
    const response = await apiClient.post("/diet/meal", mealData);
    return response.data;
  } catch (error) {
    console.error("❌ createMeal error:", error);
    throw error; // 상위에서 catch 가능
  }
};

// 식사 수정
export const updateMeal = async (updatedData) => {
  try {
    console.log("📦 updateMeal data:", updatedData);
    const response = await apiClient.post("/diet/meal/update", updatedData);
    return response.data;
  } catch (error) {
    console.error("❌ updateMeal error:", error);
    throw error;
  }
};

// 식사 삭제
export const deleteMeal = async (mealId) => {
  try {
    console.log("🗑 deleteMeal ID:", mealId);
    const response = await apiClient.post("/diet/meal/delete", mealId);
    return response.data;
  } catch (error) {
    console.error("❌ deleteMeal error:", error);
    throw error;
  }
};
